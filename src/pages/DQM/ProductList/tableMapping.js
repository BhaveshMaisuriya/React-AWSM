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
    label: "PRODUCT CODE",
    apiKey: "code",
    columnSize: "cell-text",
    type: "link",
  },
  name: {
    label: "PRODUCT NAME",
    apiKey: "name",
    columnSize: "cell-text-big",
  },
  status_sap: {
    label: "PRODUCT STATUS IN SAP",
    apiKey: "status_sap",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  status_awsm: {
    label: "PRODUCT STATUS IN AWSM",
    apiKey: "status_awsm",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  division: {
    label: "PRODUCT DIVISION",
    apiKey: "division",
    columnSize: "cell-text",
  },
  material_group: {
    label: "MATERIAL GROUP",
    apiKey: "material_group",
    columnSize: "cell-text",
  },
  product_group: {
    label: "PRODUCT GROUP",
    apiKey: "product_group",
    columnSize: "cell-text-big",
  },
  category: {
    label: "PRODUCT CATEGORY",
    apiKey: "category",
    columnSize: "cell-text",
  },
  sub_category: {
    label: "PRODUCT SUB CATEGORY",
    apiKey: "sub_category",
    columnSize: "cell-text-big",
  },
  uom: {
    label: "UOM",
    apiKey: "uom",
    columnSize: "cell-text",
  },
  density: {
    label: "PRODUCT DENSITY",
    apiKey: "density",
    columnSize: "cell-text",
  },
  remarks: {
    label: "REMARKS",
    apiKey: "remarks",
    columnSize: "cell-text-big",
  },
}

export { tableMapping, tableColumns }
