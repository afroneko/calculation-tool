import { create } from "zustand";

const useCalculatieStore = create((set) => ({
  type: null, //Ofwel offerte of order
  document: null,
  files: [],  //De geüploade DXF bestanden
  materials: [],  //Bestanden aangevuld met materiaal/ditke enz. (stap 2)
  nestingData: [],  //De uitgelezen afmetingen per bestand (stap 3)
  operations: [], //bewerkingen per bestand (zet, walsen, lassen, etc.)
  externalOperations: [],//externe bewerkingen per bestand (coaten, graveren, etc.)
  platenData: [],// plaatmaten (voor nu even 1)

    // instellingen
  tarieven: [
    { id: 1, label: "Lasersnijden",                        unit: "€ / min", rate: 5.27   },
    { id: 2, label: "W.v.b",                               unit: "€ / uur", rate: 91.00  },
    { id: 3, label: "Zetwerk machine + 1e man",            unit: "€ / uur", rate: 85.00  },
    { id: 4, label: "Plaatwerk 2e man",                    unit: "€ / uur", rate: 75.00  },
    { id: 5, label: "Zaagwerk/lassen/beitsen/schuren",     unit: "€ / uur", rate: 75.00  },
    { id: 6, label: "Boren/tappen/gaten verzinken",        unit: "€ / uur", rate: 70.00  },
    { id: 7, label: "Uitbreken/afbramen/trommelontbramen", unit: "€ / uur", rate: 64.00  },
    { id: 8, label: "Walsen",                              unit: "€ / uur", rate: 136.50 },
    { id: 9, label: "Verpakken",                           unit: "€ / uur", rate: 64.00  },
  ],
  normtijden: [
    { id: 1, label: "Zetting 1e man", unit: "min / zetting", time: 8.5 },
    { id: 2, label: "Zetting 2e man", unit: "min / zetting", time: 8.5 },
    { id: 3, label: "Laswerk",        unit: "min / meter",   time: 8.0 },
    { id: 4, label: "Boren",          unit: "min / gat",     time: 1.5 },
    { id: 5, label: "Tappen",         unit: "min / gat",     time: 2.0 },
    { id: 6, label: "Verzinken",      unit: "min / gat",     time: 1.0 },
    { id: 7, label: "Walsen",         unit: "min / meter",   time: 16.0 },
    { id: 8, label: "Afbramen",       unit: "min / stuk",    time: 2.5 },
    { id: 9, label: "Verpakken",      unit: "min / stuk",    time: 3.0 },
  ],

  setTarieven: (tarieven) => set({ tarieven }),
  setNormtijden: (normtijden) => set({ normtijden }),

  setType: (type) => set({ type }), 

  setDocument: (document) => set ({ document}),
  
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
    document: null,
    files: [], 
    materials: [], 
    nestingData: [], 
    operations: [],
    externalOperations: [],
    platenData: [],}),
}));

export default useCalculatieStore;