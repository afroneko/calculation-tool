import { describe, it, expect } from "vitest";

// we importeren de functie los, dus die moet je even exporteren in Nesting.jsx
import { parseDxf } from "../services/parseDxf";


describe("parseDxf", () => {
  // helper om een nep File object te maken met DXF inhoud
  const maakDxfFile = (content) => {
    return new File([content], "test.dxf", { type: "text/plain" });
  };

  it("leest breedte en hoogte uit een simpele rechthoek", async () => {
    const dxf = `
      0\nSECTION\n2\nENTITIES\n
      0\nLWPOLYLINE\n8\n0\n90\n4\n70\n1\n10\n0.0\n
      20\n0.0\n10\n100.0\n20\n0.0\n10\n100.0\n20\n
      50.0\n10\n0.0\n20\n50.0\n0\nENDSEC\n0\nEOF\n
    `;

    const file = maakDxfFile(dxf);
    const result = await parseDxf(file);

    expect(result.width).toBe(100);
    expect(result.height).toBe(50);
  });

  it("telt cirkels als gaten", async () => {
   const dxf = `
      0\nSECTION\n2\nENTITIES\n
      0\nCIRCLE\n8\n0\n10\n50.0\n20\n25.0\n30\n0.0\n40\n5.0\n
      0\nCIRCLE\n8\n0\n10\n30.0\n20\n25.0\n30\n0.0\n40\n3.0\n
      0\nENDSEC\n0\nEOF\n`;

    const file = maakDxfFile(dxf);
    const result = await parseDxf(file);

    expect(result.holeCount).toBe(2);
  });

  it("geeft 0 terug bij leeg bestand", async () => {
    const dxf = `0\nSECTION\n2\nENTITIES\n0\nENDSEC\n0\nEOF`;
    const file = maakDxfFile(dxf);
    const result = await parseDxf(file);

    expect(result.holeCount).toBe(0);
  });
});
