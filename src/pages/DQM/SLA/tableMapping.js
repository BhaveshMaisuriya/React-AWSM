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
      columnSize: 1,
    },
    description: {
      label: "Description",
      apiKey: "description",
      columnSize: 2,
    },
    kpi: {
      label: "KPI",
      apiKey: "kpi",
      columnSize: 3
    },
    mitigation_plan: {
      label: "Mitigation Plan",
      apiKey: "mitigation_plan",
      columnSize: 2
    },
    action_by: {
      label: "Action By",
      apiKey: "action_by",
      columnSize: 1,
    },
    module: {
      label: "Module",
      apiKey: "module",
      columnSize: 1,
    },
    remarks: {
      label: "Remarks",
      apiKey: "remarks",
      columnSize: 2,
    }
  }
  
  export { tableMapping, tableColumns }
  