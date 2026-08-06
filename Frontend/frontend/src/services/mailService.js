export const openMail = (document, nestingData, operations, kostenposten, totaal) => {
  const onderwerp = `Calculatie ${document?.quoteNumber ?? ""}`;

  const body = `
Beste,

Hierbij de calculatie.

ORDERGEGEVENS
-------------
Ordernummer: ${document?.quoteNumber ?? "-"}
Klant: ${document?.customer ?? "-"}
Verkoper: ${document?.salesperson ?? "-"}
Aangemaakt op: ${document?.createdAt ?? "-"}

ONDERDELEN
----------
${nestingData
  .map(
    (r) =>
      `• ${r.materiaalNaam} | ${r.dikte} | ${r.lengte}x${r.breedte} mm | Gewicht: ${r.gewicht.toFixed(2)} kg | Aantal: ${r.aantallen} | Gaten: ${r.gaten}`
  )
  .join("\n")}

BEWERKINGEN
-----------
${operations
  .map(
    (o) =>
      `• ${o.naam}
    Zet 1e man: ${o.zet1eman ?? "-"}
    Zet 2e man: ${o.zet2eman ?? "-"}
    Walsen: ${o.walsen ?? "-"}
    Boren/tappen: ${o.borenTappenGaten ?? "-"}
    Lassen: ${o.lassen ?? "-"}
    Afbramen: ${o.afbramen ? "Ja" : "Nee"}`
  )
  .join("\n\n")}

KOSTENOVERZICHT
---------------
${kostenposten
  .map(
    (k) =>
      `${k.label}: € ${k.kostprijs.toFixed(2).replace(".", ",")} (${(
        (k.kostprijs / totaal) *
        100
      ).toFixed(1)}%)`
  )
  .join("\n")}

TOTAAL
------
€ ${totaal.toFixed(2).replace(".", ",")}

Met vriendelijke groet,
`;

  window.location.href = `mailto:?subject=${encodeURIComponent(
    onderwerp
  )}&body=${encodeURIComponent(body)}`;
};