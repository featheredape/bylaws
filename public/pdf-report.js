/* ═══════════════════════════════════════════════════════════════════
   Salt Spring Island Bylaw Compliance Checker — PDF Report Generator

   Generates a professional A4 PDF compliance report using jsPDF.
   Reads global state from app.js: lastResultData, lastAnalyzedSections,
   lastQuery, lastPIDData.
   ═══════════════════════════════════════════════════════════════════ */

/* ── PDF Layout Constants ─────────────────────────────────────── */
const PDF = {
    // Page dimensions (A4 in mm)
    page: { width: 210, height: 297 },
    // Margins
    margin: { top: 18, right: 20, bottom: 22, left: 20 },
    // Header
    header: { height: 58, accentStripe: 2 },
    // Property info box inside header
    propBox: { y: 31, height: 22, cornerRadius: 2 },
    // Spacing between elements
    spacing: {
        sectionGap: 7,          // space after section heading underline
        sectionHeadingNeed: 14, // minimum space needed for a section heading
        paragraphGap: 3,        // between paragraphs/items
        cardGap: 8,             // between cards/boxes
        afterSection: 2,        // extra space after section content
    },
    // Font sizes
    font: {
        title: 20,
        subtitle: 8.5,
        date: 7.5,
        propLabel: 6,
        propValue: 9,
        propDpa: 7.5,
        statusLabel: 10,
        statusBody: 8.5,
        sectionHeading: 9,
        body: 8.5,
        bodySmall: 8,
        refPill: 6,
        stepNum: 7.5,
        meta: 6.5,
        footer: 6,
        footerSmall: 5.5,
        disclaimer: 6.5,
    },
    // Line heights (as multiplier of font size)
    lineH: 0.42,
};

// Computed content width
PDF.contentWidth = PDF.page.width - PDF.margin.left - PDF.margin.right;

/* ── PDF Color Palette ────────────────────────────────────────── */
const C = {
    // Forest green scale (matches CSS --sage-* tokens)
    forest:  [21, 56, 38],    // --sage-900
    green9:  [27, 67, 50],    // darker forest
    green8:  [35, 77, 56],    // --sage-800
    green7:  [45, 106, 79],   // --sage-700
    green5:  [64, 145, 108],  // --sage-500
    green3:  [163, 217, 190], // --sage-300
    green1:  [232, 245, 238], // --sage-100

    // Status colors
    amber7:  [146, 64, 14],
    amber1:  [254, 243, 199],
    red7:    [153, 27, 27],
    red1:    [254, 226, 226],
    blue7:   [30, 58, 138],
    blue1:   [219, 234, 254],

    // Grays
    gray9:   [17, 24, 39],
    gray7:   [55, 65, 81],
    gray6:   [75, 85, 99],
    gray5:   [107, 114, 128],
    gray4:   [156, 163, 175],
    gray3:   [209, 213, 219],
    gray2:   [229, 231, 235],
    gray1:   [243, 244, 246],
    white:   [255, 255, 255],

    // Header text accents
    headerSubtext:  [180, 210, 195],
    headerMuted:    [140, 175, 160],
    propLabel:      [140, 175, 160],
    propValue:      [230, 245, 238],
    propBoxBg:      [28, 62, 45],
};

/* ── Status color map ─────────────────────────────────────────── */
const STATUS_STYLES = {
    likely_compliant:     { label: "LIKELY COMPLIANT",     bg: C.green1, fg: C.green9, accent: C.green5 },
    likely_non_compliant: { label: "LIKELY NON-COMPLIANT", bg: C.red1,   fg: C.red7,   accent: [239, 68, 68] },
    needs_review:         { label: "NEEDS FURTHER REVIEW", bg: C.amber1, fg: C.amber7, accent: [245, 158, 11] },
    insufficient_info:    { label: "MORE INFO NEEDED",     bg: C.blue1,  fg: C.blue7,  accent: [59, 130, 246] },
};

/* ── PDF Generation ───────────────────────────────────────────── */
function downloadPDF() {
    if (!lastResultData) return alert("No results to export.");
    if (!window.jspdf) return alert("PDF library is still loading. Please wait a moment and try again.");

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: "mm", format: "a4" });
        const ml = PDF.margin.left;
        const mr = PDF.margin.right;
        const pw = PDF.page.width;
        const ph = PDF.page.height;
        const cw = PDF.contentWidth;
        let y = 0;
        let pageNum = 1;

        // ── Drawing helpers ──────────────────────────────────
        function checkPage(needed) {
            if (y + needed > ph - PDF.margin.bottom) {
                addFooter();
                doc.addPage();
                pageNum++;
                y = PDF.margin.top;
            }
        }

        function addFooter() {
            doc.setDrawColor(...C.gray3);
            doc.setLineWidth(0.2);
            doc.line(ml, ph - 16, pw - mr, ph - 16);
            doc.setFontSize(PDF.font.footer);
            doc.setTextColor(...C.gray5);
            doc.setFont("helvetica", "normal");
            doc.text("For informational purposes only. Not legal or planning advice.", ml, ph - 12);
            doc.text("Always verify with Islands Trust planning staff.", ml, ph - 8.5);
            doc.text("Page " + pageNum, pw - mr, ph - 12, { align: "right" });
            doc.setFontSize(PDF.font.footerSmall);
            doc.setTextColor(...C.gray4);
            doc.text("Salt Spring Island Bylaw Compliance Checker", pw - mr, ph - 8.5, { align: "right" });
        }

        function drawRect(x, yPos, w, h, color) {
            doc.setFillColor(...color);
            doc.rect(x, yPos, w, h, "F");
        }

        function drawRoundedRect(x, yPos, w, h, rx, ry, style) {
            if (doc.roundedRect) {
                doc.roundedRect(x, yPos, w, h, rx, ry, style);
            } else {
                doc.rect(x, yPos, w, h, style);
            }
        }

        function drawFilledRoundedRect(x, yPos, w, h, rx, ry, color) {
            doc.setFillColor(...color);
            if (doc.roundedRect) {
                doc.roundedRect(x, yPos, w, h, rx || 1.5, ry || 1.5, "F");
            } else {
                doc.rect(x, yPos, w, h, "F");
            }
        }

        function drawLine(x1, yPos, x2, color) {
            doc.setDrawColor(...color);
            doc.setLineWidth(0.2);
            doc.line(x1, yPos, x2, yPos);
        }

        function wrappedText(text, x, startY, maxW, fontSize, color, fontStyle) {
            doc.setFontSize(fontSize);
            doc.setTextColor(...color);
            doc.setFont("helvetica", fontStyle || "normal");
            const lines = doc.splitTextToSize(text || "", maxW);
            const lineH = fontSize * PDF.lineH;
            for (var li = 0; li < lines.length; li++) {
                checkPage(lineH + 2);
                doc.text(lines[li], x, y);
                y += lineH;
            }
            return lines.length;
        }

        function sectionHeading(title) {
            checkPage(PDF.spacing.sectionHeadingNeed);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(PDF.font.sectionHeading);
            doc.setTextColor(...C.green9);
            doc.text(title, ml, y);
            y += 4;
            doc.setDrawColor(...C.green3);
            doc.setLineWidth(0.4);
            doc.line(ml, y, ml + cw, y);
            y += PDF.spacing.sectionGap - 2;
        }

        // ══════════════════════════════════════════════════════
        // HEADER
        // ══════════════════════════════════════════════════════
        var headerH = PDF.header.height;
        drawRect(0, 0, pw, headerH, C.forest);
        drawRect(0, headerH - PDF.header.accentStripe, pw, PDF.header.accentStripe, C.green8);

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(PDF.font.title);
        doc.setTextColor(...C.white);
        doc.text("Bylaw Compliance Report", ml, 16);

        // Subtitle
        doc.setFont("helvetica", "normal");
        doc.setFontSize(PDF.font.subtitle);
        doc.setTextColor(...C.headerSubtext);
        doc.text("Salt Spring Island  |  Land Use Bylaw No. 355 & OCP No. 434", ml, 23);

        // Date
        var today = new Date().toLocaleDateString("en-CA", {
            year: "numeric", month: "long", day: "numeric",
        });
        doc.setFontSize(PDF.font.date);
        doc.setTextColor(...C.headerMuted);
        doc.text(today, pw - mr, 16, { align: "right" });

        // ── Property info row ────────────────────────────────
        var propY = PDF.propBox.y;
        if (lastPIDData) {
            var d = lastPIDData;
            var pidStr = d.pid || "";
            var zoneStr = (d.lub_zone_code || d.zone_code || "") +
                (d.lub_zone_name || d.zone_desc ? " — " + (d.lub_zone_name || d.zone_desc) : "");
            var dpaStr = d.dpas && d.dpas.length > 0
                ? d.dpas.map(function(dpa) { return dpa.name; }).join(", ")
                : "None";

            drawFilledRoundedRect(ml, propY - 2, cw, PDF.propBox.height, PDF.propBox.cornerRadius, PDF.propBox.cornerRadius, C.propBoxBg);

            // PID
            doc.setFont("helvetica", "normal");
            doc.setFontSize(PDF.font.propLabel);
            doc.setTextColor(...C.propLabel);
            doc.text("PID", ml + 5, propY + 3);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(PDF.font.propValue);
            doc.setTextColor(...C.propValue);
            doc.text(pidStr, ml + 5, propY + 8);

            // Zone
            var zoneX = ml + 45;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(PDF.font.propLabel);
            doc.setTextColor(...C.propLabel);
            doc.text("ZONE", zoneX, propY + 3);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(PDF.font.propValue);
            doc.setTextColor(...C.propValue);
            var zoneTrunc = zoneStr.length > 35 ? zoneStr.substring(0, 35) + "..." : zoneStr;
            doc.text(zoneTrunc || "Not determined", zoneX, propY + 8);

            // DPAs
            doc.setFont("helvetica", "normal");
            doc.setFontSize(PDF.font.propLabel);
            doc.setTextColor(...C.propLabel);
            doc.text("DEVELOPMENT PERMIT AREAS", ml + 5, propY + 14);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(PDF.font.propDpa);
            doc.setTextColor(...C.propValue);

            // Build DPA string with sub-type descriptions for DPA 6
            var dpaWithSubtypeStr = "";
            if (d.dpas && d.dpas.length > 0) {
                dpaWithSubtypeStr = d.dpas.map(function(dpa) {
                    // For DPA 6, include the sub-type description
                    // For other DPAs, only include description if it adds info
                    if (dpa.number === 6 && dpa.description) {
                        return dpa.name + " (" + dpa.description + ")";
                    } else if (dpa.description && !dpa.name.includes(dpa.description)) {
                        return dpa.name + " (" + dpa.description + ")";
                    } else {
                        return dpa.name;
                    }
                }).join("; ");
            } else {
                dpaWithSubtypeStr = "None";
            }

            var dpaTrunc = dpaWithSubtypeStr.length > 90 ? dpaWithSubtypeStr.substring(0, 90) + "..." : dpaWithSubtypeStr;
            doc.text(dpaTrunc, ml + 5, propY + 18.5);
        } else {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(PDF.font.propDpa);
            doc.setTextColor(...C.headerMuted);
            doc.text("No property (PID) was specified for this query.", ml, propY + 5);
        }

        y = headerH + PDF.spacing.cardGap;

        // ══════════════════════════════════════════════════════
        // COMPLIANCE STATUS
        // ══════════════════════════════════════════════════════
        var data = lastResultData;
        var st = STATUS_STYLES[data.compliance_status] || STATUS_STYLES.needs_review;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(PDF.font.statusBody);
        var summaryLines = doc.splitTextToSize(data.summary || "", cw - 18);
        var statusBoxH = Math.max(20, 14 + summaryLines.length * 3.8);

        checkPage(statusBoxH + 6);
        drawFilledRoundedRect(ml, y, cw, statusBoxH, 2.5, 2.5, st.bg);
        doc.setFillColor(...st.accent);
        doc.rect(ml, y, 3, statusBoxH, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(PDF.font.statusLabel);
        doc.setTextColor(...st.fg);
        doc.text(st.label, ml + 9, y + 7);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(PDF.font.statusBody);
        doc.setTextColor(...st.fg);
        doc.text(summaryLines, ml + 9, y + 13);
        y += statusBoxH + 6;

        // ══════════════════════════════════════════════════════
        // ANALYZED SECTIONS
        // ══════════════════════════════════════════════════════
        doc.setFont("helvetica", "normal");
        doc.setFontSize(PDF.font.meta);
        doc.setTextColor(...C.gray5);
        var sectionsText = "Analyzed against: LUB No. 355";
        if (lastAnalyzedSections && lastAnalyzedSections.length) {
            sectionsText += ", " + lastAnalyzedSections.map(function(s) { return s.label; }).join(", ");
        }
        doc.text(sectionsText, ml, y);
        y += PDF.spacing.sectionGap;

        // ══════════════════════════════════════════════════════
        // YOUR QUERY
        // ══════════════════════════════════════════════════════
        sectionHeading("YOUR QUERY");
        doc.setFillColor(...C.gray1);
        var queryLines = doc.splitTextToSize(lastQuery || "", cw - 14);
        var queryBoxH = Math.max(10, queryLines.length * 3.8 + 7);
        drawFilledRoundedRect(ml, y - 1, cw, queryBoxH, 2, 2, C.gray1);
        doc.setDrawColor(...C.gray2);
        drawRoundedRect(ml, y - 1, cw, queryBoxH, 2, 2, "S");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(PDF.font.statusBody);
        doc.setTextColor(...C.gray7);
        doc.text(queryLines, ml + 6, y + 4);
        y += queryBoxH + 5;

        // ══════════════════════════════════════════════════════
        // RELEVANT BYLAWS
        // ══════════════════════════════════════════════════════
        var bylaws = data.relevant_bylaws || [];
        if (bylaws.length) {
            sectionHeading("RELEVANT BYLAWS & REGULATIONS");

            for (var bi = 0; bi < bylaws.length; bi++) {
                var b = bylaws[bi];
                checkPage(18);
                var refText = b.reference || "Bylaw";
                doc.setFont("helvetica", "bold");
                doc.setFontSize(PDF.font.refPill);
                var refW = Math.min(doc.getTextWidth(refText) + 5, cw - 4);
                drawFilledRoundedRect(ml, y - 1, refW, 4.5, 1.2, 1.2, C.green9);
                doc.setTextColor(...C.white);
                doc.text(refText, ml + 2.5, y + 2);
                y += 7;

                doc.setFont("helvetica", "bold");
                doc.setFontSize(PDF.font.statusBody);
                doc.setTextColor(...C.gray9);
                doc.text(b.title || "", ml + 1, y);
                y += 4.5;

                wrappedText(b.detail || "", ml + 1, y, cw - 2, PDF.font.bodySmall, C.gray6, "normal");
                y += PDF.spacing.afterSection;

                drawLine(ml, y, ml + cw, C.gray2);
                y += 4;
            }
            y += 1;
        }

        // ══════════════════════════════════════════════════════
        // RECOMMENDATIONS
        // ══════════════════════════════════════════════════════
        var recs = data.recommendations || [];
        if (recs.length) {
            sectionHeading("RECOMMENDATIONS");
            for (var ri = 0; ri < recs.length; ri++) {
                checkPage(10);
                doc.setFillColor(...C.green5);
                doc.circle(ml + 2.5, y - 0.8, 0.9, "F");
                wrappedText(recs[ri], ml + 7, y, cw - 9, PDF.font.bodySmall, C.gray9, "normal");
                y += PDF.spacing.paragraphGap;
            }
            y += PDF.spacing.afterSection;
        }

        // ══════════════════════════════════════════════════════
        // NEXT STEPS
        // ══════════════════════════════════════════════════════
        var steps = data.next_steps || [];
        if (steps.length) {
            sectionHeading("NEXT STEPS");
            for (var si = 0; si < steps.length; si++) {
                checkPage(12);
                var cx = ml + 3.5;
                var cy = y - 0.5;
                doc.setFillColor(...C.green1);
                doc.circle(cx, cy, 3.5, "F");
                doc.setFont("helvetica", "bold");
                doc.setFontSize(PDF.font.stepNum);
                doc.setTextColor(...C.green7);
                doc.text(String(si + 1), cx - 1.3, cy + 1.2);
                wrappedText(steps[si], ml + 10, y, cw - 12, PDF.font.bodySmall, C.gray9, "normal");
                y += PDF.spacing.paragraphGap;
            }
            y += PDF.spacing.afterSection;
        }

        // ══════════════════════════════════════════════════════
        // WARNINGS
        // ══════════════════════════════════════════════════════
        var warns = data.warnings || [];
        if (warns.length) {
            sectionHeading("IMPORTANT WARNINGS");
            for (var wi = 0; wi < warns.length; wi++) {
                checkPage(14);
                var warnLines = doc.splitTextToSize(warns[wi] || "", cw - 14);
                var warnH = Math.max(9, warnLines.length * 3.5 + 5);
                drawFilledRoundedRect(ml, y - 3, cw, warnH, 2, 2, C.amber1);
                doc.setFillColor(245, 158, 11);
                doc.rect(ml, y - 3, 2.5, warnH, "F");
                doc.setFont("helvetica", "normal");
                doc.setFontSize(PDF.font.bodySmall);
                doc.setTextColor(...C.amber7);
                doc.text(warnLines, ml + 7, y + 0.5);
                y += warnH + PDF.spacing.paragraphGap;
            }
            y += 1;
        }

        // ══════════════════════════════════════════════════════
        // NEIGHBOURING DPAs — FOR CONSIDERATION
        // ══════════════════════════════════════════════════════
        if (lastPIDData && lastPIDData.neighbouring_dpas && lastPIDData.neighbouring_dpas.length > 0) {
            sectionHeading("NEIGHBOURING DPAs \u2014 FOR CONSIDERATION");

            // Explanatory note
            doc.setFont("helvetica", "italic");
            doc.setFontSize(PDF.font.bodySmall);
            doc.setTextColor(...C.gray5);
            var noteLines = doc.splitTextToSize(
                "These Development Permit Areas apply to adjacent properties and may be relevant to your application.",
                cw - 4
            );
            doc.text(noteLines, ml + 1, y);
            y += noteLines.length * 3.5 + 3;

            var nDpas = lastPIDData.neighbouring_dpas;
            for (var ni = 0; ni < nDpas.length; ni++) {
                var ndpa = nDpas[ni];
                checkPage(14);

                // Amber-tinted badge background
                var ndpaName = ndpa.name || ("DPA " + ndpa.number);
                var ndpaDescParts = [];
                if (ndpa.number === 6 && ndpa.description) {
                    ndpaDescParts.push(ndpa.description);
                } else if (ndpa.description && !ndpaName.includes(ndpa.description)) {
                    ndpaDescParts.push(ndpa.description);
                }
                if (ndpa.neighbouring_pids && ndpa.neighbouring_pids.length > 0) {
                    ndpaDescParts.push("from " + ndpa.neighbouring_pids.join(", "));
                }
                var ndpaText = ndpaName + (ndpaDescParts.length > 0 ? " \u2014 " + ndpaDescParts.join(" | ") : "");

                var ndpaLines = doc.splitTextToSize(ndpaText, cw - 14);
                var ndpaBoxH = Math.max(8, ndpaLines.length * 3.5 + 4);
                drawFilledRoundedRect(ml, y - 2, cw, ndpaBoxH, 1.5, 1.5, C.amber1);
                doc.setDrawColor(230, 195, 130);
                doc.setLineWidth(0.2);
                drawRoundedRect(ml, y - 2, cw, ndpaBoxH, 1.5, 1.5, "S");

                doc.setFont("helvetica", "normal");
                doc.setFontSize(PDF.font.bodySmall);
                doc.setTextColor(...C.amber7);
                doc.text(ndpaLines, ml + 5, y + 1.5);
                y += ndpaBoxH + 2;
            }
            y += PDF.spacing.afterSection;
        }

        // ══════════════════════════════════════════════════════
        // DISCLAIMER
        // ══════════════════════════════════════════════════════
        checkPage(22);
        y += 3;
        drawLine(ml, y, ml + cw, C.gray2);
        y += 5;
        drawFilledRoundedRect(ml, y, cw, 18, 2, 2, C.gray1);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(PDF.font.disclaimer);
        doc.setTextColor(...C.gray6);
        doc.text("DISCLAIMER", ml + 5, y + 5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(PDF.font.disclaimer);
        doc.setTextColor(...C.gray5);
        var discLines = doc.splitTextToSize(
            "This analysis is for informational purposes only and is based on Land Use Bylaw No. 355 (March 2025) and OCP No. 434. " +
            "It is not a substitute for professional planning advice. Bylaws can be amended and individual circumstances vary. " +
            "Always verify with Islands Trust planning staff or a qualified planner before proceeding.",
            cw - 10
        );
        doc.text(discLines, ml + 5, y + 9.5);

        addFooter();

        // ── Save ─────────────────────────────────────────────
        var dateStr = new Date().toISOString().slice(0, 10);
        var pidSuffix = lastPIDData && lastPIDData.pid ? "-" + lastPIDData.pid.replace(/\D/g, "") : "";
        doc.save("SSI-Compliance-Report" + pidSuffix + "-" + dateStr + ".pdf");
    } catch (err) {
        console.error("PDF generation error:", err);
        alert("Error generating PDF: " + (err.message || "Unknown error. Check the browser console for details."));
    }
}
