const tableColumns = [
  "item",
  "description",
  "kpi",
  "mitigation_plan",
  "action_by",
  "module",
  "remarks",
]

const tableMapping = {
  item: {
    label: "ITEM NO.",
    apiKey: "item",
    columnSize: "cell-text",
  },
  description: {
    label: "Description",
    apiKey: "description",
    columnSize: "cell-text-big",
  },
  kpi: {
    label: "KPI",
    apiKey: "kpi",
    columnSize: 3,
  },
  mitigation_plan: {
    label: "Mitigation Plan",
    apiKey: "mitigation_plan",
    columnSize: "cell-text-big",
  },
  action_by: {
    label: "Action By",
    apiKey: "action_by",
    columnSize: "cell-text",
  },
  module: {
    label: "Module",
    apiKey: "module",
    columnSize: "cell-text",
  },
  remarks: {
    label: "Remarks",
    apiKey: "remarks",
    columnSize: "cell-text-big",
  },
}

export { tableMapping, tableColumns }
