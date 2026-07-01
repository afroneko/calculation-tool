import { create } from "zustand";

const useCalculatieStore = create((set) => ({
  type: null, //Ofwel offerte of order
  files: [],  //De geüploade DXF bestanden
  materials: [],  //Bestanden aangevuld met materiaal/ditke enz. (stap 2)
  nestingData: [],  //De uitgelezen afmetingen per bestand (stap 3)
  operations: [], //bewerkingen per bestand (zet, walsen, lassen, etc.)
  externalOperations: [],//externe bewerkingen per bestand (coaten, graveren, etc.)
  platenData: [],// plaatmaten (voor nu even 1)

  setType: (type) => set({ type }), 
  
//platen
  setPlatenData: (platenData) => set({ platenData }),

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

   setOperations: (operations) => set({ operations }),
  updateOperation: (id, field, value) =>
    set((state) => ({
      operations: state.operations.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    })),

  setExternalOperations: (externalOperations) => set({ externalOperations }),
  updateExternalOperation: (id, field, value) =>
    set((state) => ({
      externalOperations: state.externalOperations.map((o) =>
        o.id === id ? { ...o, [field]: value } : o
      ),
    })),

  // reset voor nieuwe offerte/order
  reset: () => set({ 
    type: null, 
    files: [], 
    materials: [], 
    nestingData: [], 
    operations: [],
    externalOperations: [],
    platenData: [],}),
}));

export default useCalculatieStore;