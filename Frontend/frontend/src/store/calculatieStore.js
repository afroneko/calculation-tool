import { create } from "zustand";

const useCalculatieStore = create((set) => ({
  type: null,
  files: [],
  materials: [],
  nestingData: [],

  setType: (type) => set({ type }),

  // files
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),

  // materials
  setMaterials: (materials) => set({ materials }),
  updateMaterial: (id, field, value) =>
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    })),

  // nesting
  setNestingData: (nestingData) => set({ nestingData }),

  // reset voor nieuwe offerte/order
  reset: () => set({ type: null, files: [], materials: [], nestingData: [] }),
}));

export default useCalculatieStore;