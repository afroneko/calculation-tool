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

TOTAAL
------
€ ${totaal.toFixed(2).replace(".", ",")}

Met vriendelijke groet,
`;

  window.location.href = `mailto:?subject=${encodeURIComponent(
    onderwerp
  )}&body=${encodeURIComponent(body)}`;
};

