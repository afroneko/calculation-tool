import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatEuro = (bedrag) =>
  `€ ${bedrag.toFixed(2).replace(".", ",")}`;

export const genereerPdf = (document, nestingData, operations, kostenposten, totaal) => {
  const pdf = new jsPDF();
  const paginaBreedte = pdf.internal.pageSize.getWidth();

  // -- Header --
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("Tummers Calculations", 14, 20);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Gegenereerd op: ${new Date().toLocaleDateString("nl-NL")}`, paginaBreedte - 14, 20, { align: "right" });

  // -- Ordergegevens --
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.text("Ordergegevens", 14, 35);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  const ordergegevens = [
    ["Ordernummer",  document?.quoteNumber ?? "-"],
    ["Klant",        document?.customer ?? "-"],
    ["Verkoper",     document?.salesperson ?? "-"],
    ["Aangemaakt op",document?.createdAt ?? "-"],
  ];

  autoTable(pdf, {
    startY: 40,
    body: ordergegevens,
    theme: "plain",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 40 },
    },
  });

  // -- DXF regels --
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.text("Onderdelen", 14, pdf.lastAutoTable.finalY + 15);

  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 20,
    head: [["Materiaal", "Dikte", "Lengte (mm)", "Breedte (mm)", "Gewicht (kg)", "Aantallen", "Gaten"]],
    body: nestingData.map((r) => [
      r.materiaalNaam,
      r.dikte,
      r.lengte,
      r.breedte,
      r.gewicht.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      r.aantallen,
      r.gaten,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [212, 96, 26] },
  });

  // -- Bewerkingen --
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.text("Bewerkingen", 14, pdf.lastAutoTable.finalY + 15);

  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 20,
    head: [["DXF naam", "Zet 1e man", "Zet 2e man", "Walsen", "Boren/tappen", "Lassen", "Afbramen"]],
    body: operations.map((o) => [
      o.naam,
      o.zet1eman ?? "-",
      o.zet2eman ?? "-",
      o.walsen ?? "-",
      o.borenTappenGaten ?? "-",
      o.lassen ?? "-",
      o.afbramen ? "Ja" : "Nee",
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [212, 96, 26] },
  });

  // -- Kostenoverzicht --
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.text("Kostenoverzicht", 14, pdf.lastAutoTable.finalY + 15);

  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 20,
    head: [["Kostenpost", "Kostprijs", "% van totaal", "Toelichting"]],
    body: [
      ...kostenposten.map((k) => [
        k.label,
        formatEuro(k.kostprijs),
        `${((k.kostprijs / totaal) * 100).toFixed(1)}%`,
        k.toelichting,
      ]),
      // totaalrij
      ["Totale kostprijs", formatEuro(totaal), "100%", ""],
    ],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [212, 96, 26] },
    // totaalrij vet maken
    didParseCell: (data) => {
      if (data.row.index === kostenposten.length) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = [245, 247, 255];
      }
    },
  });

  // -- Download --
  const bestandsnaam = `calculatie-${document?.quoteNumber ?? "onbekend"}-${new Date().toLocaleDateString("nl-NL").replace(/\//g, "-")}.pdf`;
  pdf.save(bestandsnaam);
};