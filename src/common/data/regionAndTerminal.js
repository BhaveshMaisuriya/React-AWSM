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
    region: "Southern",
    terminal: ["Melaka", "Pasir Gudang"],
  },
  {
    region: "Sabah",
    terminal: ["Labuan", "Sandakan", "Sepangar Bay", "Tawau JV"],
  },
  {
    region: "Sarawak",
    terminal: ["Bintulu JV", "Miri", "Senari IOT", "Tg Manis CODT"],
  },
  {
    region: "*Special Product",
    terminal: [
      "All",
      "Melaka",
      "Prai",
      "Kerteh",
      "Sepangar Bay",
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
  "All": "SPECIAL_ALL"
}

export const TERMINAL_CODE_MAPPING_ID = {
  "M808": "KVDT",
  "M838": "Kerteh",
  "M839": "Kuantan",
  "M819": "Langkawi",
  "M818": "Prai",
  "M817": "Lumut",
  "M828": "Melaka",
  "M829": "Pasir Gudang",
  "M846": "Labuan",
  "M847": "Sandakan",
  "M848": "Sepangar Bay",
  "M849": "Tawau JV",
  "M858": "Bintulu JV",
  "M859": "Miri",
  "M855": "Senari IOT",
  "M857": "Tg Manis CODT",
  "SPECIAL_ALL": "All"
}

export default REGION_TERMINAL