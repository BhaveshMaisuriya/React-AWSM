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
  "remarks",
]

const tableMapping = {
  code: {
    label: "Code",
    apiKey: "code",
    columnSize: "cell-text",
    type: "link",
  },
  name: {
    label: "Name",
    apiKey: "name",
    columnSize: "cell-text-big",
  },
  status_sap: {
    label: "Status in SAP",
    apiKey: "status_sap",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  status_awsm: {
    label: "Status in AWSM",
    apiKey: "status_awsm",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  division: {
    label: "Division",
    apiKey: "division",
    columnSize: "cell-text",
  },
  material_group: {
    label: "Material Group",
    apiKey: "material_group",
    columnSize: "cell-text",
  },
  product_group: {
    label: "Product Group",
    apiKey: "product_group",
    columnSize: "cell-text-big",
  },
  category: {
    label: "Category",
    apiKey: "category",
    columnSize: "cell-text",
  },
  sub_category: {
    label: "SubCategory",
    apiKey: "sub_category",
    columnSize: "cell-text-big",
  },
  uom: {
    label: "UOM",
    apiKey: "uom",
    columnSize: "cell-text",
  },
  density: {
    label: "Density",
    apiKey: "density",
    columnSize: "cell-text",
  },
  remarks: {
    label: "Remarks",
    apiKey: "remarks",
    columnSize: "cell-text-big",
  },
}

export { tableMapping, tableColumns }
