import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useCalculatieStore from "../store/calculatieStore";

describe("calculatieStore", () => {
  beforeEach(() => {
    // reset de store voor elke test
    useCalculatieStore.getState().reset();
  });

  // -- files --

  it("voegt een bestand toe aan files", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.addFile({ id: "1", naam: "test.dxf", file: null });
    });

    expect(result.current.files).toHaveLength(1);
    expect(result.current.files[0].naam).toBe("test.dxf");
  });

  it("verwijdert een bestand op id", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.addFile({ id: "1", naam: "test.dxf", file: null });
      result.current.addFile({ id: "2", naam: "test2.dxf", file: null });
      result.current.removeFile("1");
    });

    expect(result.current.files).toHaveLength(1);
    expect(result.current.files[0].id).toBe("2");
  });

  // -- materials --

  it("initialiseert materials vanuit files met standaard waarden", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([
        {
          id: "1",
          naam: "test.dxf",
          materiaalnr: null,
          materiaalNaam: null,
          artikelgroepId: null,
          artikelgroepCode: null,
          zoekCode: null,
          dikte: "2mm",
          aantallen: null,
        },
      ]);
    });

    expect(result.current.materials).toHaveLength(1);
    expect(result.current.materials[0].dikte).toBe("2mm");
  });

  it("update materiaalNaam correct", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([{ id: "1", naam: "test.dxf", materiaalNaam: null }]);
      result.current.updateMaterial("1", "materiaalNaam", "RVS304 KGW ZF");
    });

    expect(result.current.materials[0].materiaalNaam).toBe("RVS304 KGW ZF");
  });

  it("update artikelgroepId correct", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([{ id: "1", naam: "test.dxf", artikelgroepId: null }]);
      result.current.updateMaterial("1", "artikelgroepId", 135);
    });

    expect(result.current.materials[0].artikelgroepId).toBe(135);
  });

  it("update zoekCode correct", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([{ id: "1", naam: "test.dxf", zoekCode: null }]);
      result.current.updateMaterial("1", "zoekCode", "rvs 304");
    });

    expect(result.current.materials[0].zoekCode).toBe("rvs 304");
  });

  it("update dikte correct", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([{ id: "1", naam: "test.dxf", dikte: "2mm" }]);
      result.current.updateMaterial("1", "dikte", "10mm");
    });

    expect(result.current.materials[0].dikte).toBe("10mm");
  });

  it("update aantallen correct", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([{ id: "1", naam: "test.dxf", aantallen: null }]);
      result.current.updateMaterial("1", "aantallen", 5);
    });

    expect(result.current.materials[0].aantallen).toBe(5);
  });

  it("update raakt andere materials niet aan", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([
        { id: "1", naam: "test1.dxf", aantallen: 1 },
        { id: "2", naam: "test2.dxf", aantallen: 2 },
      ]);
      result.current.updateMaterial("1", "aantallen", 5);
    });

    expect(result.current.materials[0].aantallen).toBe(5);
    expect(result.current.materials[1].aantallen).toBe(2);
  });

  // -- visitedSteps --

  // it("voegt een bezochte stap toe", () => {
  //   const { result } = renderHook(() => useCalculatieStore());

  //   act(() => {
  //     result.current.addVisitedStep("stap1");
  //     result.current.addVisitedStep("stap2");
  //     result.current.addVisitedStep("stap1"); // duplicaat
  //   });

  //   expect(result.current.visitedSteps).toHaveLength(2);
  // });

  // -- reset --

  // it("reset gooit alles weg behalve tarieven en normtijden", () => {
  //   const { result } = renderHook(() => useCalculatieStore());

  //   act(() => {
  //     result.current.addFile({ id: "1", naam: "test.dxf", file: null });
  //     result.current.addVisitedStep("stap1");
  //     result.current.reset();
  //   });

  //   expect(result.current.files).toHaveLength(0);
  //   expect(result.current.visitedSteps).toHaveLength(0);
  //   expect(result.current.tarieven.length).toBeGreaterThan(0); // tarieven blijven
  // });
});