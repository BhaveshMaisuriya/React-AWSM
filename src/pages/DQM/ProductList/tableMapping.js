const tableColumns = [
  "code",
  "name",
  "status_sap",
  "status_awsm",
  "division",
  "material_group",
  "product_group",
  "category",
  "sub_category",
  "uom",
  "density",
  "remarks"
  
]

const tableMapping = {
  code: {
    label: "Code",
    apiKey: "code",
    columnSize: 1,
  },
  name: {
    label: "Name",
    apiKey: "name",
    columnSize: 2,
  },
  status_sap: {
    label: "Status in SAP",
    apiKey: "status_sap",
    columnSize: 1,
    type: "badge",
    getBadgeColor: (value) => {
      return value === "ACTIVE" ? "primary" : "secondary"
    }
  },
  status_awsm: {
    label: "Status in AWSM",
    apiKey: "status_awsm",
    columnSize: 1,
    type: "badge",
    getBadgeColor: (value) => {
      return value === "ACTIVE" ? "primary" : "secondary"
    }
  },
  division: {
    label: "Division",
    apiKey: "division",
    columnSize: 1,
  },
  material_group: {
    label: "Material Group",
    apiKey: "material_group",
    columnSize: 1,
  },
  product_group: {
    label: "Product Group",
    apiKey: "product_group",
    columnSize: 2,
  },
  category: {
    label: "Category",
    apiKey: "category",
    columnSize: 1,
  },
  sub_category: {
    label: "SubCategory",
    apiKey: "sub_category",
    columnSize: 2,
  },
  uom: {
    label: "UOM",
    apiKey: "uom",
    columnSize: 1,
  },
  density: {
    label: "Density",
    apiKey: "density",
    columnSize: 1,
  },
  remarks: {
    label: "Remarks",
    apiKey: "remarks",
    columnSize: 2,
  }
}

export { tableMapping, tableColumns }
