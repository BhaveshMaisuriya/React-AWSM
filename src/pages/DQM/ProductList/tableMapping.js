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
    label: "CODE",
    apiKey: "code",
    columnSize: "cell-text",
    type: "link",
  },
  name: {
    label: "NAME",
    apiKey: "name",
    columnSize: "cell-text-big",
  },
  status_sap: {
    label: "STATUS IN SAP",
    apiKey: "status_sap",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  status_awsm: {
    label: "STATUS IN AWSM",
    apiKey: "status_awsm",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  division: {
    label: "DIVISION",
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
    label: "CATEGORY",
    apiKey: "category",
    columnSize: "cell-text",
  },
  sub_category: {
    label: "SUBCATEGORY",
    apiKey: "sub_category",
    columnSize: "cell-text-big",
  },
  uom: {
    label: "UOM",
    apiKey: "uom",
    columnSize: "cell-text",
  },
  density: {
    label: "DENSITY",
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
