import { describe, it, expect, vi, beforeEach } from "vitest";

// mock de fetch
global.fetch = vi.fn();

const maakExportData = () => ({
  documentId: 64311, document: { quoteId: "64311", customer: "Tummers", salesperson: "Jan", createdAt: "01-01-2026" },
  nestingData: [
    { id: "1", materiaalNaam: "RVS304 KGW ZF", dikte: "2mm", aantallen: 5, oppervlakte: 0.5, gewicht: 3.5, gaten: 2 }
  ],
  operations: [
    { id: "1", zet1eman: 10, zet2eman: null, walsen: null, borenTappenGaten: null, lassen: null, afbramen: true }
  ],
  externalOperations: [
    { id: "1", zwartcoaten: false, parelcoaten: false, precisieGaten: null, graveren: null }
  ],
  kostenposten: [{ label: "Materiaal", kostprijs: 100 }],
  totaal: 100,
  files: [{ id: "1", naam: "test.dxf" }],
  materials: [{ id: "1", materiaalnr: 200, materiaalNaam: "RVS304 KGW ZF" }],
});

describe("exportService", () => {
  beforeEach(() => {
    vi.resetModules();
    fetch.mockClear();
  });

  it("stuurt de juiste data naar de backend", async () => {
    const { exportNaarRidder } = await import("../services/exportService");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ succes: true }),
      text: async () => JSON.stringify({ succes: true }),
    });

    const { documentId, document, nestingData, operations, externalOperations, kostenposten, totaal, files, materials } = maakExportData();

    await exportNaarRidder(documentId, document, nestingData, operations, externalOperations, kostenposten, totaal, files, materials);

    expect(fetch).toHaveBeenCalledWith("/api/export", expect.objectContaining({
      method: "POST",
    }));

    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.orderId).toBe(64311);
    expect(body.verkoopregels).toHaveLength(1);
    expect(body.verkoopregels[0].dxfNaam).toBe("test.dxf");
    expect(body.verkoopregels[0].materiaalnr).toBe(200);
    expect(body.totaalPrijs).toBe(100);
  });

  it("gooit een error als de response niet ok is", async () => {
    const { exportNaarRidder } = await import("../services/exportService");

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });

    const { documentId, document, nestingData, operations, externalOperations, kostenposten, totaal, files, materials } = maakExportData();

    await expect(
      exportNaarRidder(documentId, document, nestingData, operations, externalOperations, kostenposten, totaal, files, materials)
    ).rejects.toThrow("Export mislukt");
  });
});