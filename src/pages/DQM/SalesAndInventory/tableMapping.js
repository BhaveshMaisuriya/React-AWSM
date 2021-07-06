const tableColumns = [
  "record_id",
  "override",
  "ship_to_party",
  "product",
  "data_source",
  "station_tank_status",
  "sales_variance",
  "sales_variance_percentage",
  "inventory_variance",
  "remarks",
]

const tableMapping = {
  record_id: {
    label: "RECORD ID",
    columnSize: "cell-text",
    type: "link",
  },
  ship_to_party: {
    label: "SHIP TO PARTY",
    columnSize: "cell-text",
  },
  product: {
    label: "PRODUCT",
    columnSize: "cell-text",
  },
  override: {
    label: "OVERRIDE ACTION",
    columnSize: "cell-text",
    type:"override"
  },
  data_source: {
    label: "SOURCE OF DATA",
    columnSize: "cell-text",
  },
  station_tank_status: {
    label: "STATION TANK STATUS",
    columnSize: "cell-text",
  },
  product_status: {
    label: "PRODUCT STATUS",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  remarks: {
    label: "REMARKS",
    columnSize: "cell-text",
  },
  actual_sales: {
    label: "ACTUAL SALES (L)",
    columnSize: "cell-text",
  },
  expected_sales: {
    label: "EXPECTED SALES (L)",
    columnSize: "cell-text",
  },
  yesterday_sales_adjustment: {
    label: "YESTERDAY'S SALES ADJUSTMENT REMARKS",
    columnSize: "cell-text",
  },
  yesterday_sales_adjustment_remarks: {
    label: "YESTERDAY SALES ADJUSTMENT REMARKS",
    columnSize: "cell-text",
  },
  sales_final_figure: {
    label: "SALES FINAL FIGURE (L)",
    columnSize: "cell-text",
  },
  sales_variance: {
    label: "SALES VARIANCE (L)",
    columnSize: "cell-text",
    type: "color",
    getColor: (value, threshold) => {
      return Math.abs(value) <= threshold ? "green-text" : "red-text"
    },
  },
  sales_variance_percentage: {
    label: "SALES VARIANCE (%)",
    columnSize: "cell-text",
    type: "color",
    getColor: (value, threshold) => {
      return Math.abs(value) <= threshold ? "green-text" : "red-text"
    },
  },
  dipping_value: {
    label: "DIPPING VALUE (L)",
    columnSize: "cell-text",
  },
  dipping_timestamp: {
    label: "DIPPING TIMESTAMP",
    columnSize: "cell-text",
  },
  dipping_to_midnight_sales_volume: {
    label: "DIPPING TO MIDNIGHT SALES VOLUME (L)",
    columnSize: "cell-text",
  },
  dipping_to_midnight_delivery: {
    label: "DIPPING TO MIDNIGHT DELIVERY (L)",
    columnSize: "cell-text",
  },
  dipping_to_midnight_diversion: {
    label: "DIPPING TO MIDNIGHT DIVERSION (L)",
    columnSize: "cell-text",
  },
  dipping_to_midnight_diversion_remarks: {
    label: "DIPPING TO MIDNIGHT DIVERSION (L) REMARKS",
    columnSize: "cell-text",
  },
  dipping_adjustment: {
    label: "DIPPING ADJUSTMENT (L)",
    columnSize: "cell-text",
  },
  dipping_adjustment_remarks: {
    label: "DIPPING ADJUSTMENT (L)",
    columnSize: "cell-text",
  },
  delivery_adjustment: {
    label: "DELIVERY ADJUSTMENT (L)",
    columnSize: "cell-text",
  },
  delivery_adjustment_remarks: {
    label: "DELIVERY ADJUSTMENT (L) REMARKS",
    columnSize: "cell-text",
  },
  opening_inventory: {
    label: "OPENING INVENTORY @12AM (L)",
    columnSize: "cell-text",
  },
  yesterday_opening_inventory: {
    label: "OPENING INVENTORY @12AM (L)",
    columnSize: "cell-text",
  },
  yesterday_final_sales_figure: {
    label: "YESTERDAY'S SALES FINAL FIGURE (L)",
    columnSize: "cell-text",
  },
  yesterday_delivery: {
    label: "YESTERDAY DELIVERY (L)",
    columnSize: "cell-text",
  },
  yesterday_diversion: {
    label: "YESTERDAY DIVERSION (L)",
    columnSize: "cell-text",
  },
  yesterday_diversion_remarks: {
    label: "YESTERDAY DIVERSION (L) REMARKS",
    columnSize: "cell-text",
  },
  yesterday_delivery_adjustment: {
    label: "YESTERDAY DELIVERY ADJUSTMENT (L)",
    columnSize: "cell-text",
  },
  yesterday_delivery_adjustment_remarks: {
    label: "YESTERDAY DELIVERY ADJUSTMENT REMARKS",
    columnSize: "cell-text",
  },
  calculated_inventory: {
    label: "CALCULATED INVENTORY @12AM (L)",
    columnSize: "cell-text",
  },
  inventory_final_figure: {
    label: "INVENTORY FINAL FIGURE (L)",
    columnSize: "cell-text",
  },
  inventory_variance: {
    label: "INVENTORY VARIANCE (L)",
    columnSize: "cell-text",
    type: "color",
    getColor: (value, threshold) => {
      return Math.abs(value) <= threshold ? "green-text" : "red-text"
    },
  },
  inventory_variance_percentage: {
    label: "INVENTORY VARIANCE (%)",
    columnSize: "cell-text",
    type: "color",
    getColor: (value, threshold) => {
      return Math.abs(value) <= threshold ? "green-text" : "red-text"
    },
  },
  // total_delivery: {
  //   label: "",
  //   columnSize: "cell-text",
  // },
  inventory_correction_volume: {
    label: "INVENTORY CORRECTION VOLUME",
    columnSize: "cell-text",
  },
  inventory_correction_remarks: {
    label: "INVENTORY CORRECTION REMARKS",
    columnSize: "cell-text",
  },
  // region: {
  //   label: "",
  //   columnSize: "cell-text",
  // },
  // terminal: [],
}

export { tableMapping, tableColumns }
