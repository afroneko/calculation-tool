export const valideerStap = (stap, store) => {
  const { document, files, materials, nestingData, kostenposten } = store;

  switch (stap) {
    case 1:
      if (!document) return { geldig: false, fout: "Haal eerst een order of offerte op uit Ridder." };
      return { geldig: true };

    case 2:
      if (files.length === 0) return { geldig: false, fout: "Upload minimaal één DXF bestand." };
      return { geldig: true };

    case 3: {
      const ontbreektMateriaal = materials.some((m) => !m.materiaalNaam);
      const ontbreektDikte     = materials.some((m) => !m.dikte);
      const ontbreektAantallen = materials.some((m) => !m.aantallen || m.aantallen <= 0);

      if (ontbreektMateriaal) return { geldig: false, fout: "Selecteer voor elk bestand een materiaal." };
      if (ontbreektDikte)     return { geldig: false, fout: "Selecteer voor elk bestand een dikte." };
      if (ontbreektAantallen) return { geldig: false, fout: "Vul voor elk bestand een aantal in." };
      return { geldig: true };
    }

    case 4:
      if (nestingData.length === 0) return { geldig: false, fout: "Voer eerst de materiaalberekening uit." };
      return { geldig: true };

    case 5: {
      // waarschuwing als alles leeg is
      const heeftBewerkingen = store.operations.some((o) =>
        o.zet1eman || o.zet2eman || o.walsen || o.borenTappenGaten || o.lassen || o.afbramen
      );
      if (!heeftBewerkingen) return { geldig: true, waarschuwing: "Je hebt geen bewerkingen ingevuld. Weet je zeker dat je door wilt gaan?" };
      return { geldig: true };
    }

    case 6: {
      // waarschuwing als alles leeg is
      const heeftExterneBewerkingen = store.externalOperations.some((o) =>
        o.zwartcoaten || o.parelcoaten || o.precisieGaten || o.graveren
      );
      if (!heeftExterneBewerkingen) return { geldig: true, waarschuwing: "Je hebt geen externe bewerkingen ingevuld. Weet je zeker dat je door wilt gaan?" };
      return { geldig: true };
    }

    case 7:
      if (!kostenposten || kostenposten.length === 0) return { geldig: false, fout: "De calculatie is nog niet berekend." };
      return { geldig: true };

    default:
      return { geldig: true };
  }
};