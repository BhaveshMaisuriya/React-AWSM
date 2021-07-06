const varianceControl = {
  date: "2021-02-06",
  sales: [
    {
      station_tank_status: "LV1",
      variance_value: "50000",
      variance_percentage: "20000",
    },
    {
      station_tank_status: "LV2",
      variance_value: "234",
      variance_percentage: "150",
    },
    {
      station_tank_status: "Normal",
      variance_value: "0000",
      variance_percentage: "50",
    },
    {
      station_tank_status: "TC",
      variance_value: "234",
      variance_percentage: "250",
    },
  ],
  inventory: [
    {
      station_tank_status: "LV1",
      variance_value: "50000",
      variance_percentage: "50",
    },
    {
      station_tank_status: "LV2",
      variance_value: "234",
      variance_percentage: "150",
    },
    {
      station_tank_status: "Normal",
      variance_value: "0000",
      variance_percentage: "50",
    },
    {
      station_tank_status: "TC",
      variance_value: "234",
      variance_percentage: "250",
    },
  ]
}

const currentSaleAndInventory = {
  details: {
    ship_to_party: "RJY0129",
    product: "string",
    data_source: "string",
    station_tank_status: "string",
    remarks: "string"
  },
  sales: {
    actual_sales: 123123,
    expected_sales: 123123,
    yesterday_sales_adjustment: "12 mar 2021",
    yesterday_sales_adjustment_remarks: "12 mar 2021",
    sales_final_figure: 123123,
    sales_variance: 12341234,
    sales_variance_percent: 23
  },
  inventory: {
    inventory_variance: 12345,
    inventory_variance_percent: 32,
    inventory_final_figure: 123,
    calculated_inventory: 123,
    dipping_value: 123,
    dipping_date_time: "12 mar, 12:30PM",
    dipping_to_mid_night_sales_volume: 12312,
    dipping_to_midnight_delivery: 123,
    dipping_to_midnight_deversion: "12 Mar 2021",
    dipping_to_midnight_deversion_remarks: "12 Mar 2021",
    dipping_adjustment: "12 Mar 2021",
    dipping_adjustment_remarks: "12 Mar 2021",
    delivery_adjustment: "12 Mar 2021",
    delivery_adjustment_remark: "12 Mar 2021",
    opening_inventory: 1123123,
    yesterday_opening_inventory: 12312,
    yesterday_sales_final_figure: 12312,
    yesterday_delivery: 123123,
    yesterday_diversion: "12 Mar 2021",
    yesterday_diversion_remarks: "12 Mar 2021",
    yesterday_delivery_adjustment: "12 Mar 2021",
    yesterday_delivery_adjustment_remarks: "12 Mar 2021",
    calculated_inventory: 23412,
    inventory_correction: "12 Mar 2021",
    inventory_correction_remarks: "string"
  },
  delivery: [
    {
      date: "21 Apr 2021",
      volume: 1000,
      volume_adjustment: 900,
      total_delivery: 1231
    },
    {
      date: "21 Apr 2021",
      volume: 1000,
      volume_adjustment: 900,
      total_delivery: 1231
    },
    {
      date: "21 Apr 2021",
      volume: 1000,
      volume_adjustment: 900,
      total_delivery: 1231
    },
    {
      date: "21 Apr 2021",
      volume: 1000,
      volume_adjustment: 900,
      total_delivery: 1231
    },
    {
      date: "21 Apr 2021",
      volume: 1000,
      volume_adjustment: 900,
      total_delivery: 1231
    },
  ]
}

export { varianceControl, currentSaleAndInventory }
