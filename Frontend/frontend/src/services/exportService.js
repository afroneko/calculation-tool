export const exportNaarRidder = async (document, nestingData, operations, externalOperations, kostenposten, totaal) => {
  const verkoopregels = nestingData.map((r) => {
    const bewerking = operations.find((o) => o.id === r.id) ?? {};
    const extern = externalOperations.find((o) => o.id === r.id) ?? {};

    return {
      dxfNaam:              r.naam,
      materiaalnr:          r.materiaalnr,
      materiaalOmschrijving: r.materiaalNaam,
      dikte:                r.dikte,
      aantallen:            r.aantallen,
      oppervlakte:          r.oppervlakte,
      gewicht:              r.gewicht,
      gaten:                r.gaten,

      // bewerkingen
      zet1Eman:        bewerking.zet1eman ?? null,
      zet2Eman:        bewerking.zet2eman ?? null,
      walsen:          bewerking.walsen ?? null,
      borenTappenGaten:bewerking.borenTappenGaten ?? null,
      lassen:          bewerking.lassen ?? null,
      afbramen:        bewerking.afbramen ?? false,

      // externe bewerkingen
      zwartcoaten:  extern.zwartcoaten ?? false,
      parelcoaten:  extern.parelcoaten ?? false,
      precisieGaten:extern.precisieGaten ?? null,
      graveren:     extern.graveren ?? null,
    };
  });

  const body = {
    orderInfo: {
      orderNummer:  document?.quoteNumber ?? "-",
      klant:        document?.customer ?? "-",
      verkoper:     document?.salesperson ?? "-",
      aangemaaktOp: document?.createdAt ?? "-",
    },
    verkoopregels,
    kostenposten,
    totaalPrijs: totaal,
  };

  const response = await fetch("/api/export", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("Export mislukt");
  return await response.json();
};