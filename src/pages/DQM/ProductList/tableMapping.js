import { tagColors } from "../Common/helper"

const tableColumns = [
  "code",
  "name",
  "status_sap",
  "status_awsm",
  "material_group",
  "category",
  "product_group",
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
    key: "frozen",
  },
  name: {
    label: "PRODUCT NAME",
    apiKey: "name",
    columnSize: "cell-text-big",
  },
  status_sap: {
    label: "STATUS IN SAP",
    apiKey: "status_sap",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return tagColors[`${value.toUpperCase()}`] || "secondary"
    },
  },
  status_awsm: {
    label: "STATUS IN AWSM",
    apiKey: "status_awsm",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return tagColors[`${value.toUpperCase()}`] || "secondary"
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
  category: {
    label: "PRODUCT CATEGORY",
    apiKey: "category",
    columnSize: "cell-text",
  },
  product_group: {
    label: "PRODUCT GROUP",
    apiKey: "product_group",
    columnSize: "cell-text-big",
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
