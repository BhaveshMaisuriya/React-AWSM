const tableColumns = [
  "product_code",
  "product_name",
  "product_status_in_sap",
  "product_status_in_awsm",
  "product_division",
  "material_group",
  "product_group",
  "product_category",
  "product_sub_category",
  "uom",
  "product_density",
  "remarks"
  
]

const tableMapping = {
  product_code: {
    label: "Product Code",
    apiKey: "product_code",
    columnSize: 2,
  },
  product_name: {
    label: "Product Name",
    apiKey: "product_name",
    columnSize: 2,
  },
  product_status_in_sap: {
    label: "Product Status in SAP",
    apiKey: "product_status_in_sap",
    columnSize: 2,
  },
  product_status_in_awsm: {
    label: "Product Status in AWSM",
    apiKey: "product_status_in_awsm",
    columnSize: 2,
  },
  product_division: {
    label: "Product Division",
    apiKey: "product_division",
    columnSize: 2,
  },
  material_group: {
    label: "Material Group",
    apiKey: "material_group",
    columnSize: 2,
  },
  product_group: {
    label: "Product Group",
    apiKey: "product_group",
    columnSize: 2,
  },
  product_category: {
    label: "Product Category",
    apiKey: "product_category",
    columnSize: 2,
  },
  product_sub_category: {
    label: "Product SubCategory",
    apiKey: "product_sub_category",
    columnSize: 2,
  },
  uom: {
    label: "UOM",
    apiKey: "uom",
    columnSize: 2,
  },
  product_density: {
    label: "Product Density",
    apiKey: "product_density",
    columnSize: 2,
  },
  remarks: {
    label: "Remarks",
    apiKey: "remarks",
    columnSize: 2,
  }
}

export { tableMapping, tableColumns }
