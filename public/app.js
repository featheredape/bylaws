/* ═══════════════════════════════════════════════════════════════════
   Salt Spring Island Bylaw Compliance Checker — Application Logic
   ═══════════════════════════════════════════════════════════════════ */

/* ── Constants ─────────────────────────────────────────────────── */
const MAX_QUERY_LENGTH = 5000;

/* ── Global state ──────────────────────────────────────────────── */
let lastResultData = null;
let lastAnalyzedSections = [];
let lastQuery = "";
let lastPIDData = null;
let pidLookupInFlight = false;
let addressLookupInFlight = false;
let currentSearchMode = "address"; // "address" or "pid"

/* ── PID Formatting ────────────────────────────────────────────── */
function formatPID(raw) {
    const digits = raw.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6)
        return digits.slice(0, 3) + "-" + digits.slice(3);
    return (
        digits.slice(0, 3) +
        "-" +
        digits.slice(3, 6) +
        "-" +
        digits.slice(6, 9)
    );
}

// Auto-format PID as user types + address Enter key
document.addEventListener("DOMContentLoaded", () => {
    const pidIn = document.getElementById("pidInput");
    pidIn.addEventListener("input", () => {
        const pos = pidIn.selectionStart;
        const old = pidIn.value;
        pidIn.value = formatPID(old);
        const diff = pidIn.value.length - old.length;
        pidIn.setSelectionRange(pos + diff, pos + diff);
    });
    pidIn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") lookupPID();
    });

    const addrIn = document.getElementById("addressInput");
    if (addrIn) {
        addrIn.addEventListener("keydown", (e) => {
            if (e.key === "Enter") lookupAddress();
        });
    }
});

/* ── Search Mode Toggle ───────────────────────────────────────── */
function setSearchMode(mode) {
    currentSearchMode = mode;
    var pidRow = document.getElementById("pidSearchRow");
    var addrRow = document.getElementById("addressSearchRow");
    var modePID = document.getElementById("modePID");
    var modeAddr = document.getElementById("modeAddress");
    var resultEl = document.getElementById("pidResult");

    if (mode === "address") {
        pidRow.style.display = "none";
        addrRow.style.display = "flex";
        modePID.classList.remove("active");
        modeAddr.classList.add("active");
        document.getElementById("addressInput").focus();
    } else {
        pidRow.style.display = "flex";
        addrRow.style.display = "none";
        modePID.classList.add("active");
        modeAddr.classList.remove("active");
        document.getElementById("pidInput").focus();
    }

    // Clear previous results and context when switching modes
    resultEl.className = "pid-result";
    resultEl.innerHTML = "";
    clearPropertyContext();
}

/* ── Address Lookup ───────────────────────────────────────────── */
async function lookupAddress() {
    if (addressLookupInFlight) return;

    var addrIn = document.getElementById("addressInput");
    var btn = document.getElementById("addressBtn");
    var resultEl = document.getElementById("pidResult");
    var address = addrIn.value.trim();

    if (!address || address.length < 3) {
        resultEl.className = "pid-result show error";
        resultEl.innerHTML = '<div class="pid-result-title">Invalid Address</div>' +
            '<p class="pid-error-msg">Please enter a street address (e.g. 123 Rainbow Road)</p>';
        return;
    }

    addressLookupInFlight = true;
    btn.disabled = true;
    btn.classList.add("loading");
    resultEl.className = "pid-result";
    resultEl.innerHTML = "";

    try {
        var resp = await fetch("/api/address-lookup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: address }),
        });

        var json = await resp.json();

        if (!json.success) {
            resultEl.className = "pid-result show error";
            resultEl.innerHTML = '<div class="pid-result-title">' + esc(json.error) + '</div>' +
                (json.geocoded_address ? '<p class="pid-error-msg">Geocoded to: ' + esc(json.geocoded_address) + '</p>' : '');
            lastPIDData = null;
            return;
        }

        // Use the same lastPIDData format so useProperty() works
        lastPIDData = json.data;
        var d = json.data;

        // Build matched address display
        var addrHtml = '<div class="pid-address-match">' +
            '<div class="pid-prop-label">Matched Address</div>' +
            '<div class="pid-prop-value">' + esc(d.matched_address) + '</div>' +
            '</div>';

        // Build zone highlight (same as PID lookup)
        var zoneHtml = "";
        if (d.zone_code) {
            var zCode = esc(d.lub_zone_code || d.zone_code);
            var zName = esc(d.lub_zone_name || d.zone_desc || "");
            zoneHtml = '<div class="pid-zone-highlight">' +
                '<div class="pid-zone-code">' + zCode + '</div>' +
                '<div class="pid-zone-name">' + zName + '</div>' +
                '<div class="pid-zone-bylaw">Land Use Bylaw 355 &middot; Islands Trust</div>' +
                '</div>';
        } else {
            zoneHtml = '<div class="pid-zone-highlight pid-zone-not-found">' +
                '<div class="pid-zone-code">Zone Not Found</div>' +
                '<div class="pid-zone-name">Parcel may be outside zoned area</div>' +
                '</div>';
        }

        // Build DPA list (same as PID lookup)
        var dpaHtml = "";
        if (d.dpas && d.dpas.length > 0) {
            dpaHtml = d.dpas.map(function(dpa) {
                var shouldShowDesc = dpa.number === 6 || (dpa.description && !dpa.name.includes(dpa.description));
                var descHtml = shouldShowDesc && dpa.description
                    ? '<div class="dpa-subtype">' + esc(dpa.description) + '</div>'
                    : '';
                return '<div class="pid-dpa-badge dpa-confirmed">' +
                    '<span class="dpa-confidence-tag">Confirmed</span>' +
                    '<span><span class="dpa-name">' + esc(dpa.name) + '</span>' + descHtml + '</span>' +
                    '</div>';
            }).join("");
        } else {
            dpaHtml = '<span class="pid-dpa-none">No Development Permit Areas apply to this parcel</span>';
        }

        // Build neighbouring DPAs section
        var neighbourHtml = "";
        if (d.neighbouring_dpas && d.neighbouring_dpas.length > 0) {
            var badges = d.neighbouring_dpas.map(function(dpa) {
                var pidList = dpa.neighbouring_pids && dpa.neighbouring_pids.length > 0
                    ? '<span class="dpa-source-tag">from ' + dpa.neighbouring_pids.map(esc).join(", ") + '</span>'
                    : '';
                var shouldShowDesc = dpa.number === 6 || (dpa.description && !dpa.name.includes(dpa.description));
                var descHtml = shouldShowDesc && dpa.description
                    ? '<div class="dpa-subtype">' + esc(dpa.description) + '</div>'
                    : '';
                return '<div class="pid-dpa-badge dpa-neighbour">' +
                    '<span class="dpa-confidence-tag">Neighbour</span>' +
                    '<span><span class="dpa-name">' + esc(dpa.name) + '</span>' + descHtml + pidList + '</span>' +
                    '</div>';
            }).join("");
            neighbourHtml =
                '<div class="pid-neighbouring-section">' +
                '<div class="pid-prop-label pid-neighbouring-label">Neighbouring DPAs &mdash; For Consideration</div>' +
                '<div class="pid-neighbouring-note">These DPAs apply to adjacent properties and may affect your application.</div>' +
                '<div class="pid-dpa-list">' + badges + '</div>' +
                '</div>';
        }

        // Build adjacent parcels section
        var adjacentHtml = "";
        if (d.adjacent_parcels && d.adjacent_parcels.length > 0) {
            var rows = d.adjacent_parcels.map(function(ap) {
                var zoneTag = ap.zone_code
                    ? '<span class="adj-zone-code">' + esc(ap.zone_code) + '</span>' +
                      '<span class="adj-zone-name">' + esc(ap.zone_name || "") + '</span>'
                    : '<span class="adj-zone-name adj-zone-unknown">Zone not determined</span>';
                var dpaTags = "";
                if (ap.dpas && ap.dpas.length > 0) {
                    dpaTags = ap.dpas.map(function(dpa) {
                        return '<span class="adj-dpa-pill">DPA ' + dpa.number + '</span>';
                    }).join("");
                }
                return '<div class="adj-parcel-row">' +
                    '<span class="adj-pid">' + esc(ap.pid) + '</span>' +
                    '<span class="adj-zone">' + zoneTag + '</span>' +
                    (dpaTags ? '<span class="adj-dpas">' + dpaTags + '</span>' : '') +
                    '</div>';
            }).join("");
            adjacentHtml =
                '<div class="pid-adjacent-section adj-accordion" id="adjAccordionAddr">' +
                '<div class="pid-prop-label pid-adjacent-label adj-accordion-trigger" role="button" tabindex="0" aria-expanded="false" onclick="toggleAdjAccordion(\'adjAccordionAddr\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAdjAccordion(\'adjAccordionAddr\')}">' +
                'Adjacent Properties (' + d.adjacent_parcels.length + ')' +
                '<span class="adj-accordion-chevron">&#x25BC;</span>' +
                '</div>' +
                '<div class="adj-accordion-panel">' +
                '<div class="adj-parcel-list">' + rows + '</div>' +
                '</div>' +
                '</div>';
        }

        // Auto-incorporate property into query
        useProperty();

        resultEl.className = "pid-result show";
        resultEl.innerHTML =
            '<div class="pid-result-header">' +
            '<div class="pid-result-title">Property Found</div>' +
            '</div>' +
            addrHtml +
            zoneHtml +
            '<div class="pid-props">' +
            '<div class="pid-prop">' +
            '<div class="pid-prop-label">PID</div>' +
            '<div class="pid-prop-value">' + esc(d.pid) + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="pid-dpas-section">' +
            '<div class="pid-prop-label pid-dpas-label">Development Permit Areas (OCP 434)</div>' +
            '<div class="pid-dpa-list">' + dpaHtml + '</div>' +
            '</div>' +
            neighbourHtml +
            adjacentHtml +
            (d.debug_map_link
                ? '<div class="pid-map-link"><a href="' + esc(d.debug_map_link) + '" target="_blank" rel="noopener">Verify location on Google Maps &rarr;</a></div>'
                : "") +
            '';
    } catch (err) {
        resultEl.className = "pid-result show error";
        resultEl.innerHTML = '<div class="pid-result-title">Connection Error</div>' +
            '<p class="pid-error-msg">Could not reach the address lookup service. Please try again.</p>';
        lastPIDData = null;
    } finally {
        btn.disabled = false;
        btn.classList.remove("loading");
        addressLookupInFlight = false;
    }
}

/* ── Character counter & inline validation ─────────────────────── */
function updateCharCount() {
    var el = document.getElementById("charCount");
    if (!el) return;
    var len = document.getElementById("queryInput").value.length;
    el.textContent = len.toLocaleString() + " / " + MAX_QUERY_LENGTH.toLocaleString();
    el.className = "char-count" +
        (len > MAX_QUERY_LENGTH ? " over" : len > MAX_QUERY_LENGTH * 0.85 ? " warn" : "");
}

function showValidation(msg) {
    var el = document.getElementById("fieldError");
    var ta = document.getElementById("queryInput");
    if (el) {
        el.querySelector(".field-error-msg").textContent = msg;
        el.classList.add("show");
    }
    if (ta) ta.classList.add("invalid");
}

function clearValidation() {
    var el = document.getElementById("fieldError");
    var ta = document.getElementById("queryInput");
    if (el) el.classList.remove("show");
    if (ta) ta.classList.remove("invalid");
}

document.addEventListener("DOMContentLoaded", function() {
    var queryInput = document.getElementById("queryInput");
    if (queryInput) {
        queryInput.addEventListener("input", function() {
            updateCharCount();
            clearValidation();
        });
        updateCharCount();
    }
});

/* ── PID Lookup ────────────────────────────────────────────────── */
async function lookupPID() {
    if (pidLookupInFlight) return; // Debounce guard

    const pidIn = document.getElementById("pidInput");
    const btn = document.getElementById("pidBtn");
    const resultEl = document.getElementById("pidResult");
    const pid = pidIn.value.trim();

    if (!pid || pid.replace(/\D/g, "").length !== 9) {
        resultEl.className = "pid-result show error";
        resultEl.innerHTML = '<div class="pid-result-title">Invalid PID</div>' +
            '<p class="pid-error-msg">Please enter a 9-digit parcel identification number (e.g. 009-123-456)</p>';
        return;
    }

    pidLookupInFlight = true;
    btn.disabled = true;
    btn.classList.add("loading");
    resultEl.className = "pid-result";
    resultEl.innerHTML = "";

    try {
        const resp = await fetch("/api/pid-lookup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pid }),
        });

        const json = await resp.json();

        if (!json.success) {
            resultEl.className = "pid-result show error";
            resultEl.innerHTML = '<div class="pid-result-title">' + esc(json.error) + '</div>';
            lastPIDData = null;
            return;
        }

        lastPIDData = json.data;
        const d = json.data;

        // Build zone highlight
        let zoneHtml = "";
        if (d.zone_code) {
            const zCode = esc(d.lub_zone_code || d.zone_code);
            const zName = esc(d.lub_zone_name || d.zone_desc || "");
            zoneHtml = '<div class="pid-zone-highlight">' +
                '<div class="pid-zone-code">' + zCode + '</div>' +
                '<div class="pid-zone-name">' + zName + '</div>' +
                '<div class="pid-zone-bylaw">Land Use Bylaw 355 &middot; Islands Trust</div>' +
                '</div>';
        } else {
            zoneHtml = '<div class="pid-zone-highlight pid-zone-not-found">' +
                '<div class="pid-zone-code">Zone Not Found</div>' +
                '<div class="pid-zone-name">Parcel may be outside zoned area</div>' +
                '</div>';
        }

        // Build DPA list
        let dpaHtml = "";
        if (d.dpas && d.dpas.length > 0) {
            dpaHtml = d.dpas.map(function(dpa) {
                // For DPA 6, always show the sub-type description
                // For other DPAs, only show description if it differs from the name
                const shouldShowDesc = dpa.number === 6 || (dpa.description && !dpa.name.includes(dpa.description));
                const descHtml = shouldShowDesc && dpa.description
                    ? '<div class="dpa-subtype">' + esc(dpa.description) + '</div>'
                    : '';
                return '<div class="pid-dpa-badge dpa-confirmed">' +
                    '<span class="dpa-confidence-tag">Confirmed</span>' +
                    '<span><span class="dpa-name">' + esc(dpa.name) + '</span>' + descHtml + '</span>' +
                    '</div>';
            }).join("");
        } else {
            dpaHtml = '<span class="pid-dpa-none">No Development Permit Areas apply to this parcel</span>';
        }

        // Build neighbouring DPAs section
        let neighbourHtml = "";
        if (d.neighbouring_dpas && d.neighbouring_dpas.length > 0) {
            const badges = d.neighbouring_dpas.map(function(dpa) {
                const pidList = dpa.neighbouring_pids && dpa.neighbouring_pids.length > 0
                    ? '<span class="dpa-source-tag">from ' + dpa.neighbouring_pids.map(esc).join(", ") + '</span>'
                    : '';
                const shouldShowDesc = dpa.number === 6 || (dpa.description && !dpa.name.includes(dpa.description));
                const descHtml = shouldShowDesc && dpa.description
                    ? '<div class="dpa-subtype">' + esc(dpa.description) + '</div>'
                    : '';
                return '<div class="pid-dpa-badge dpa-neighbour">' +
                    '<span class="dpa-confidence-tag">Neighbour</span>' +
                    '<span><span class="dpa-name">' + esc(dpa.name) + '</span>' + descHtml + pidList + '</span>' +
                    '</div>';
            }).join("");
            neighbourHtml =
                '<div class="pid-neighbouring-section">' +
                '<div class="pid-prop-label pid-neighbouring-label">Neighbouring DPAs &mdash; For Consideration</div>' +
                '<div class="pid-neighbouring-note">These DPAs apply to adjacent properties and may affect your application.</div>' +
                '<div class="pid-dpa-list">' + badges + '</div>' +
                '</div>';
        }

        // Build adjacent parcels section
        let adjacentHtml = "";
        if (d.adjacent_parcels && d.adjacent_parcels.length > 0) {
            const rows = d.adjacent_parcels.map(function(ap) {
                const zoneTag = ap.zone_code
                    ? '<span class="adj-zone-code">' + esc(ap.zone_code) + '</span>' +
                      '<span class="adj-zone-name">' + esc(ap.zone_name || "") + '</span>'
                    : '<span class="adj-zone-name adj-zone-unknown">Zone not determined</span>';

                let dpaTags = "";
                if (ap.dpas && ap.dpas.length > 0) {
                    dpaTags = ap.dpas.map(function(dpa) {
                        return '<span class="adj-dpa-pill">DPA ' + dpa.number + '</span>';
                    }).join("");
                }

                return '<div class="adj-parcel-row">' +
                    '<span class="adj-pid">' + esc(ap.pid) + '</span>' +
                    '<span class="adj-zone">' + zoneTag + '</span>' +
                    (dpaTags ? '<span class="adj-dpas">' + dpaTags + '</span>' : '') +
                    '</div>';
            }).join("");

            adjacentHtml =
                '<div class="pid-adjacent-section adj-accordion" id="adjAccordionPid">' +
                '<div class="pid-prop-label pid-adjacent-label adj-accordion-trigger" role="button" tabindex="0" aria-expanded="false" onclick="toggleAdjAccordion(\'adjAccordionPid\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAdjAccordion(\'adjAccordionPid\')}">' +
                'Adjacent Properties (' + d.adjacent_parcels.length + ')' +
                '<span class="adj-accordion-chevron">&#x25BC;</span>' +
                '</div>' +
                '<div class="adj-accordion-panel">' +
                '<div class="adj-parcel-list">' + rows + '</div>' +
                '</div>' +
                '</div>';
        }

        // Auto-incorporate property into query
        useProperty();

        resultEl.className = "pid-result show";
        resultEl.innerHTML =
            '<div class="pid-result-header">' +
            '<div class="pid-result-title">Property Found</div>' +
            '</div>' +
            zoneHtml +
            '<div class="pid-props">' +
            '<div class="pid-prop">' +
            '<div class="pid-prop-label">PID</div>' +
            '<div class="pid-prop-value">' + esc(d.pid || pid) + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="pid-dpas-section">' +
            '<div class="pid-prop-label pid-dpas-label">Development Permit Areas (OCP 434)</div>' +
            '<div class="pid-dpa-list">' + dpaHtml + '</div>' +
            '</div>' +
            neighbourHtml +
            adjacentHtml +
            (d.debug_map_link
                ? '<div class="pid-map-link"><a href="' + esc(d.debug_map_link) + '" target="_blank" rel="noopener">Verify location on Google Maps &rarr;</a></div>'
                : "") +
            '';
    } catch (err) {
        resultEl.className = "pid-result show error";
        resultEl.innerHTML = '<div class="pid-result-title">Connection Error</div>' +
            '<p class="pid-error-msg">Could not reach the property lookup service. Please try again.</p>';
        lastPIDData = null;
    } finally {
        btn.disabled = false;
        btn.classList.remove("loading");
        pidLookupInFlight = false;
    }
}

function useProperty() {
    var contextEl = document.getElementById("propertyContext");
    if (!contextEl) return;

    if (!lastPIDData) {
        contextEl.style.display = "none";
        contextEl.innerHTML = "";
        return;
    }

    var d = lastPIDData;
    var zCode = d.lub_zone_code || d.zone_code;
    var zName = d.lub_zone_name || d.zone_desc;

    var zonePart = zCode
        ? '<span class="ctx-tag ctx-zone">' + esc(zCode) + '</span>'
        : '<span class="ctx-tag ctx-zone ctx-none">Zone unknown</span>';

    var dpaPart = "";
    if (d.dpas && d.dpas.length > 0) {
        dpaPart = d.dpas.map(function(dpa) {
            return '<span class="ctx-tag ctx-dpa">DPA ' + dpa.number + '</span>';
        }).join("");
    } else {
        dpaPart = '<span class="ctx-tag ctx-dpa ctx-none">No DPAs</span>';
    }

    contextEl.innerHTML =
        '<span class="ctx-label">Your query will include:</span>' +
        '<span class="ctx-tags">' + zonePart + dpaPart + '</span>' +
        '<button class="ctx-clear" onclick="clearPropertyContext()" title="Remove property context">&times;</button>';
    contextEl.style.display = "flex";
}

function clearPropertyContext() {
    lastPIDData = null;
    var contextEl = document.getElementById("propertyContext");
    if (contextEl) {
        contextEl.style.display = "none";
        contextEl.innerHTML = "";
    }
}

/** Build the zone/DPA context string to prepend to user query at submit time */
function buildPropertyContext() {
    if (!lastPIDData) return "";
    var d = lastPIDData;
    var lines = [];
    var zCode = d.lub_zone_code || d.zone_code;
    var zName = d.lub_zone_name || d.zone_desc;
    if (zCode) {
        lines.push("ZONE: " + zCode + " \u2014 " + (zName || "Unknown"));
    }
    if (d.dpas && d.dpas.length > 0) {
        lines.push("DPAs: " + d.dpas.map(function(dpa) { return dpa.name; }).join("; "));
    }
    return lines.length > 0 ? lines.join("\n") : "";
}

/* ── Helpers ──────────────────────────────────────────────────── */
function statusConfig(status) {
    const map = {
        likely_compliant: {
            icon: "\u2705",
            label: "Likely Compliant",
            cls: "compliant",
        },
        likely_non_compliant: {
            icon: "\u274C",
            label: "Likely Non-Compliant",
            cls: "non-compliant",
        },
        needs_review: {
            icon: "\u26A0\uFE0F",
            label: "Needs Further Review",
            cls: "review",
        },
        insufficient_info: {
            icon: "\uD83D\uDD0D",
            label: "More Information Needed",
            cls: "info",
        },
    };
    return map[status] || map.needs_review;
}

function badgeFor(ref) {
    if (!ref) return "Bylaw";
    const m = ref.match(/(?:No\.?\s*)?(\d+)/i);
    return m ? "No. " + m[1] : "Bylaw";
}

/* ── Loading animation ─────────────────────────────────────────── */
let loadingTimer;
function startLoading() {
    const steps = ["ls1", "ls2", "ls3", "ls4", "ls5"];
    steps.forEach(function(id) {
        document.getElementById(id).classList.remove("active");
    });
    let i = 0;
    document.getElementById(steps[i]).classList.add("active");
    loadingTimer = setInterval(function() {
        if (i < steps.length - 1) {
            i++;
            steps.forEach(function(id) {
                document.getElementById(id).classList.remove("active");
            });
            document.getElementById(steps[i]).classList.add("active");
        }
    }, 2200);
}
function stopLoading() {
    clearInterval(loadingTimer);
}

/* ── Render results ────────────────────────────────────────────── */
function render(data, analyzedSections) {
    const sc = statusConfig(data.compliance_status);
    let h = "";

    // Analyzed sections bar
    h += '<div class="analyzed-bar">' +
        '<span class="analyzed-label">Analyzed against:</span>' +
        '<div class="analyzed-badges">' +
        '<span class="analyzed-badge lub"><span class="analyzed-badge-icon">\uD83D\uDCCB</span> LUB No. 355</span>';
    if (analyzedSections && analyzedSections.length) {
        for (var si = 0; si < analyzedSections.length; si++) {
            var s = analyzedSections[si];
            h += '<span class="analyzed-badge"><span class="analyzed-badge-icon">' + esc(s.icon) + '</span> ' + esc(s.label) + '</span>';
        }
    }
    h += '</div></div>';

    // Status banner — icon and label are from our hardcoded statusConfig, safe to use directly
    h += '<div class="banner ' + esc(sc.cls) + '">' +
        '<div class="banner-icon">' + sc.icon + '</div>' +
        '<div class="banner-body">' +
        '<h2>' + esc(sc.label) + '</h2>' +
        '<p>' + esc(data.summary) + '</p>' +
        '</div></div>';

    // Relevant bylaws — accordion
    if (data.relevant_bylaws && data.relevant_bylaws.length) {
        h += card("\uD83D\uDCDA", "ci-green", "Relevant Bylaws &amp; Regulations", function() {
            return data.relevant_bylaws.map(function(b, i) {
                return '<div class="bylaw-item open" id="bi' + i + '">' +
                    '<div class="bylaw-trigger" role="button" tabindex="0" aria-expanded="true" onclick="toggle(\'bi' + i + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggle(\'bi' + i + '\')}">' +
                    '<div class="bylaw-left">' +
                    '<span class="bylaw-badge">' + esc(badgeFor(b.reference)) + '</span>' +
                    '<div>' +
                    '<div class="bylaw-name">' + esc(b.title) + '</div>' +
                    '<div class="bylaw-sec">' + esc(b.reference) + '</div>' +
                    '</div></div>' +
                    '<span class="bylaw-chevron">\u25BC</span>' +
                    '</div>' +
                    '<div class="bylaw-panel">' +
                    '<div class="bylaw-desc">' + esc(b.detail) + '</div>' +
                    '</div></div>';
            }).join("");
        });
    }

    // Recommendations
    if (data.recommendations && data.recommendations.length) {
        h += card("\uD83D\uDCBC", "ci-blue", "Recommendations", function() {
            return '<div class="pill-list">' + data.recommendations.map(function(r) {
                return '<div class="rec-pill"><span class="rec-arrow">\u2192</span><span>' + esc(r) + '</span></div>';
            }).join("") + '</div>';
        });
    }

    // Next steps
    if (data.next_steps && data.next_steps.length) {
        h += card("\uD83D\uDDFA\uFE0F", "ci-green", "Next Steps", function() {
            return data.next_steps.map(function(s, i) {
                return '<div class="step-item">' +
                    '<div class="step-num">' + (i + 1) + '</div>' +
                    '<div class="step-text">' + esc(s) + '</div>' +
                    '</div>';
            }).join("");
        });
    }

    // Warnings
    if (data.warnings && data.warnings.length) {
        h += card("\u26A0\uFE0F", "ci-amber", "Important Warnings", function() {
            return '<div class="pill-list">' + data.warnings.map(function(w) {
                return '<div class="warn-item"><span>\u26A0\uFE0F</span><span>' + esc(w) + '</span></div>';
            }).join("") + '</div>';
        });
    }

    // Disclaimer
    h += '<div class="disclaimer">' +
        '<span>\u2139\uFE0F</span>' +
        '<div>' +
        '<strong>For informational purposes only.</strong> ' +
        'Analysis is based on the bylaw knowledge base including <strong>Land Use Bylaw No.&nbsp;355 (March&nbsp;2025)</strong> ' +
        'and <strong>OCP No.&nbsp;434</strong>. ' +
        'This is not a substitute for professional planning advice. Bylaws can be amended and individual ' +
        'circumstances vary significantly. Always verify with ' +
        '<a href="https://islandstrust.bc.ca" target="_blank" rel="noopener">Islands Trust</a> ' +
        'planning staff or a qualified planner before proceeding.' +
        '</div></div>';

    // Action buttons
    h += '<div class="reset-row">' +
        '<button class="btn btn-secondary" onclick="resetQuery()">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>' +
        ' Check Another Query</button>' +
        '<button class="btn btn-download" onclick="downloadPDF()">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
        ' Download PDF Report</button>' +
        '</div>';

    return h;
}

/* ── Utilities ─────────────────────────────────────────────────── */
function card(icon, iconCls, title, contentFn) {
    return '<div class="card">' +
        '<div class="card-head">' +
        '<div class="card-icon ' + iconCls + '">' + icon + '</div>' +
        '<h3>' + title + '</h3>' +
        '</div>' +
        '<div class="card-body">' + contentFn() + '</div>' +
        '</div>';
}

function esc(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function toggle(id) {
    var el = document.getElementById(id);
    el.classList.toggle("open");
    var trigger = el.querySelector(".bylaw-trigger");
    if (trigger) {
        trigger.setAttribute("aria-expanded", el.classList.contains("open") ? "true" : "false");
    }
}

function toggleAdjAccordion(id) {
    var el = document.getElementById(id);
    el.classList.toggle("open");
    var trigger = el.querySelector(".adj-accordion-trigger");
    if (trigger) {
        trigger.setAttribute("aria-expanded", el.classList.contains("open") ? "true" : "false");
    }
}

/* ── Main compliance check ─────────────────────────────────────── */
async function checkCompliance() {
    const userQuery = document.getElementById("queryInput").value.trim();
    clearValidation();
    if (!userQuery) {
        showValidation("Please describe your project before checking compliance.");
        return;
    }
    if (userQuery.length < 10) {
        showValidation("Please provide more detail about your project for an accurate analysis.");
        return;
    }
    if (userQuery.length > MAX_QUERY_LENGTH) {
        showValidation("Your query is too long (max " + MAX_QUERY_LENGTH.toLocaleString() + " characters). Please shorten it.");
        return;
    }

    // Prepend property context (zone/DPA) if a property was looked up
    const propCtx = buildPropertyContext();
    const query = propCtx ? propCtx + "\n\n" + userQuery : userQuery;

    const btn = document.getElementById("checkBtn");
    const loadEl = document.getElementById("loading");
    const resEl = document.getElementById("results");

    btn.disabled = true;
    resEl.classList.remove("show");
    resEl.innerHTML = "";
    loadEl.classList.add("show");
    loadEl.scrollIntoView({ behavior: "smooth", block: "center" });
    startLoading();

    try {
        const resp = await fetch("/api/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });

        const json = await resp.json();

        if (!json.success) {
            throw new Error(json.error || "Server error " + resp.status);
        }

        lastResultData = json.data;
        lastAnalyzedSections = json.analyzed_sections || [];
        lastQuery = query;

        resEl.innerHTML = render(json.data, lastAnalyzedSections);
        resEl.classList.add("show");
        setTimeout(function() {
            resEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    } catch (err) {
        resEl.innerHTML = '<div class="error-card">' +
            '<span>\u274C</span>' +
            '<div><strong>Error:</strong> ' + esc(err.message || "Something went wrong. Please try again.") + '</div>' +
            '</div>';
        resEl.classList.add("show");
    } finally {
        stopLoading();
        loadEl.classList.remove("show");
        btn.disabled = false;
    }
}

function resetQuery() {
    document.getElementById("results").classList.remove("show");
    document.getElementById("results").innerHTML = "";
    document.getElementById("queryInput").value = "";
    clearPropertyContext();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(function() {
        document.getElementById("queryInput").focus();
    }, 500);
}

/* Example chips — fill textarea (no auto-submit) */
function activateChip(chip) {
    var textarea = document.getElementById("queryInput");
    textarea.value = chip.dataset.q;
    updateCharCount();
    clearValidation();
    textarea.focus();
    textarea.scrollIntoView({ behavior: "smooth", block: "center" });
}
document.querySelectorAll(".example-chip").forEach(function(chip) {
    chip.addEventListener("click", function() { activateChip(chip); });
    chip.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activateChip(chip);
        }
    });
});

/* Keyboard shortcut */
document.getElementById("queryInput").addEventListener("keydown", function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter")
        checkCompliance();
});
