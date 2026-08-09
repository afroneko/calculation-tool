export const exportNaarRidder = async (documentId, document, nestingData, operations, externalOperations, kostenposten, totaal, files, materials) => {
  const verkoopregels = nestingData.map((r) => {
    const bewerking = operations.find((o) => o.id === r.id) ?? {};
    const extern = externalOperations.find((o) => o.id === r.id) ?? {};
    const materiaal = materials.find((m) => m.id === r.id) ?? {};
    const file = files.find((f) => f.id === r.id) ?? {};

    return {
      dxfNaam:              file.naam,
      materiaalnr:          materiaal.materiaalnr ??0,
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
    orderId: documentId,
    verkoopregels,
    kostenposten,
    totaalPrijs: totaal,
  };

  console.log("EXPORT BODY", body);

  const response = await fetch("/api/export", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  console.log("Export response status:", response.status);
console.log("Export response body:", await response.text());

  if (!response.ok) throw new Error("Export mislukt");
  return await response.json();
};