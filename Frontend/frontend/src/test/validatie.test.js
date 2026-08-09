import { describe, it, expect } from "vitest";
import { valideerStap } from "../services/validatie";

// helper om een store te maken met standaard lege waarden
const maakStore = (overrides = {}) => ({
  document: null,
  files: [],
  materials: [],
  nestingData: [],
  operations: [],
  externalOperations: [],
  kostenposten: [],
  ...overrides,
});

describe("validatie", () => {

  // -- Stap 1 --
  describe("stap 1 - order ophalen", () => {
    it("geeft fout als document null is", () => {
      const result = valideerStap(1, maakStore());
      expect(result.geldig).toBe(false);
      expect(result.fout).toBeTruthy();
    });

    it("is geldig als document gevuld is", () => {
      const result = valideerStap(1, maakStore({ document: { quoteNumber: "123" } }));
      expect(result.geldig).toBe(true);
    });
  });

  // -- Stap 2 --
  describe("stap 2 - dxf invoer", () => {
    it("geeft fout als er geen bestanden zijn", () => {
      const result = valideerStap(2, maakStore());
      expect(result.geldig).toBe(false);
    });

    it("is geldig als er minimaal één bestand is", () => {
      const result = valideerStap(2, maakStore({
        files: [{ id: "1", naam: "test.dxf" }]
      }));
      expect(result.geldig).toBe(true);
    });
  });

  // -- Stap 3 --
  describe("stap 3 - materiaal", () => {
    it("geeft fout als materiaalNaam ontbreekt", () => {
      const result = valideerStap(3, maakStore({
        materials: [{ id: "1", materiaalNaam: null, dikte: "2mm", aantallen: 1 }]
      }));
      expect(result.geldig).toBe(false);
    });

    it("geeft fout als dikte ontbreekt", () => {
      const result = valideerStap(3, maakStore({
        materials: [{ id: "1", materiaalNaam: "RVS304", dikte: null, aantallen: 1 }]
      }));
      expect(result.geldig).toBe(false);
    });

    it("geeft fout als aantallen 0 is", () => {
      const result = valideerStap(3, maakStore({
        materials: [{ id: "1", materiaalNaam: "RVS304", dikte: "2mm", aantallen: 0 }]
      }));
      expect(result.geldig).toBe(false);
    });

    it("is geldig als alles ingevuld is", () => {
      const result = valideerStap(3, maakStore({
        materials: [{ id: "1", materiaalNaam: "RVS304", dikte: "2mm", aantallen: 3 }]
      }));
      expect(result.geldig).toBe(true);
    });
  });

  // -- Stap 4 --
  describe("stap 4 - nesting", () => {
    it("geeft fout als berekening niet uitgevoerd is", () => {
      const result = valideerStap(4, maakStore());
      expect(result.geldig).toBe(false);
    });

    it("is geldig als nestingData gevuld is", () => {
      const result = valideerStap(4, maakStore({
        nestingData: [{ id: "1", materiaalNaam: "RVS304" }]
      }));
      expect(result.geldig).toBe(true);
    });
  });

  // -- Stap 5 --
  describe("stap 5 - bewerkingen", () => {
    it("geeft waarschuwing als geen bewerkingen ingevuld", () => {
      const result = valideerStap(5, maakStore({
        operations: [{ id: "1", zet1eman: null, zet2eman: null, walsen: null, borenTappenGaten: null, lassen: null, afbramen: false }]
      }));
      expect(result.geldig).toBe(true);
      expect(result.waarschuwing).toBeTruthy();
    });

    it("is geldig zonder waarschuwing als bewerkingen ingevuld zijn", () => {
      const result = valideerStap(5, maakStore({
        operations: [{ id: "1", zet1eman: 10, zet2eman: null, walsen: null, borenTappenGaten: null, lassen: null, afbramen: false }]
      }));
      expect(result.geldig).toBe(true);
      expect(result.waarschuwing).toBeFalsy();
    });
  });

  // -- Stap 6 --
  describe("stap 6 - externe bewerkingen", () => {
    it("geeft waarschuwing als geen externe bewerkingen ingevuld", () => {
      const result = valideerStap(6, maakStore({
        externalOperations: [{ id: "1", zwartcoaten: false, parelcoaten: false, precisieGaten: null, graveren: null }]
      }));
      expect(result.geldig).toBe(true);
      expect(result.waarschuwing).toBeTruthy();
    });

    it("is geldig zonder waarschuwing als externe bewerkingen ingevuld zijn", () => {
      const result = valideerStap(6, maakStore({
        externalOperations: [{ id: "1", zwartcoaten: true, parelcoaten: false, precisieGaten: null, graveren: null }]
      }));
      expect(result.geldig).toBe(true);
      expect(result.waarschuwing).toBeFalsy();
    });
  });

  // -- Stap 7 --
  describe("stap 7 - calculatie", () => {
    it("geeft fout als kostenposten leeg zijn", () => {
      const result = valideerStap(7, maakStore());
      expect(result.geldig).toBe(false);
    });

    it("is geldig als kostenposten gevuld zijn", () => {
      const result = valideerStap(7, maakStore({
        kostenposten: [{ label: "Materiaal", kostprijs: 100 }]
      }));
      expect(result.geldig).toBe(true);
    });
  });
});