import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useCalculatieStore from "../store/calculatieStore";

describe("calculatieStore", () => {
  beforeEach(() => {
    // reset de store voor elke test
    useCalculatieStore.getState().reset();
  });

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

  it("update een materiaal veld", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.setMaterials([{ id: "1", naam: "test.dxf", materiaal: "S235", dikte: "2mm", aantallen: 1 }]);
      result.current.updateMaterial("1", "aantallen", 5);
    });

    expect(result.current.materials[0].aantallen).toBe(5);
  });

  it("voegt een bezochte stap toe", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.addVisitedStep("stap1");
      result.current.addVisitedStep("stap2");
      result.current.addVisitedStep("stap1"); // duplicaat
    });

    expect(result.current.visitedSteps).toHaveLength(2);
  });

  it("reset gooit alles weg behalve tarieven en normtijden", () => {
    const { result } = renderHook(() => useCalculatieStore());

    act(() => {
      result.current.addFile({ id: "1", naam: "test.dxf", file: null });
      result.current.addVisitedStep("stap1");
      result.current.reset();
    });

    expect(result.current.files).toHaveLength(0);
    expect(result.current.visitedSteps).toHaveLength(0);
    expect(result.current.tarieven.length).toBeGreaterThan(0); // tarieven blijven
  });
});