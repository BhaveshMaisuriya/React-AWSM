const REGION_TERMINAL = [
  {
    region: "Central",
    terminal: ["KVDT"],
  },
  {
    region: "Eastern",
    terminal: ["Kerteh", "Kuantan"],
  },
  {
    region: "Northern",
    terminal: ["Langkawi", "Prai", "Lumut"],
  },
  {
    region: "Nothern",
    terminal: ["Langkawi", "Prai", "Lumut"],
  },
  {
    region: "Southern",
    terminal: ["Melaka", "Pasir Gudang"],
  },
  {
    region: "Sabah",
    terminal: ["Labuan", "Sandakan", "Sepanggar Bay", "Tawau JV"],
  },
  {
    region: "Sarawak",
    terminal: ["Bintulu JV", "Miri", "Senari IOT", "Tg Manis CODT"],
  },
  {
    region: "Special Product",
    terminal: [
      "Melaka",
      "Prai",
      "Kerteh",
      "Sepanggar Bay",
      "Labuan",
      "Sandakan",
      "Bintulu JV",
      "Senari IOT",
    ],
  },
]

export const TERMINAL_CODE_MAPPING = {
  "KVDT": "M808",
  "Kerteh":  "M838",
  "Kuantan":  "M839",
  "Langkawi":  "M819",
  "Prai":  "M818",
  "Lumut":  "M817",
  "Melaka":  "M828",
  "Pasir Gudang":  "M829",
  "Labuan":  "M846",
  "Sandakan":  "M847",
  "Sepangar Bay":  "M848",
  "Tawau JV":  "M849",
  "Bintulu JV":  "M858",
  "Miri": "M859",
  "Senari IOT": "M855",
  "Tg Manis CODT":  "M857",
}

export default REGION_TERMINAL
