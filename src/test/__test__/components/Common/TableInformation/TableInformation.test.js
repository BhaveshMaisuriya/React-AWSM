import TabAddress from "components/Common/TableInformation/tabAddress"
import TabContact from "components/Common/TableInformation/tabContact"
import TabDelivery from "components/Common/TableInformation/tabDelivery"
import TabQuota from "components/Common/TableInformation/tabQuota"
import TabStatus from "components/Common/TableInformation/tabStatus"
import TabStorage from "components/Common/TableInformation/tabStorage"
import React from "react"
import { render } from "@testing-library/react"

const mockData = {
  ship_to_party: "0090000039",
  ship_to_company: "SRI JAWI",
  status_sap: "Operational",
  remarks: "testing upload again and again",
  updated_at: "2021-11-24T10:01:26.000Z",
  updated_by: "awsm.user03@pethlab.com.my",
  contact: {
    updated_by: "awsm.user05@pethlab.com.my",
    updated_at: "2021-11-10T01:42:09.000Z",
    contact_1: {
      id: 1467,
      name: "AHMAD FIKRI B AHMAD SHOKORI",
      number: "+6012-4251356",
      email: "PSBSMSJ@GMAIL.COM",
      position: "BOSS",
      created_at: "2021-10-08T06:33:17.000Z",
      updated_at: "2021-11-10T01:42:09.000Z",
      updated_by: "awsm.user05@pethlab.com.my",
    },
    contact_2: {
      id: 5788,
      name: "mohd najib",
      number: "1111111111111111111",
      email: "",
      position: "32131231111111111111",
      created_at: "2021-10-08T08:31:36.000Z",
      updated_at: "2021-11-09T04:49:25.000Z",
      updated_by: "awsm.user05@pethlab.com.my",
    },
    contact_3: null,
  },
  territory_manager: {
    id: 1468,
    name: "AZREE FIRDAUS B MD AMIN",
    number: "012-7566038",
    email: "azreefirdaus.amin@petronas.com.my",
    position: null,
    created_at: "2021-10-08T06:33:17.000Z",
    updated_at: "2021-10-08T06:33:17.000Z",
    updated_by: null,
  },
  retail_sales_manager: {
    id: 12578,
    name: "M IKHWAN AB NASIR2",
    number: "31323",
    email: "zzzzz@321.com",
    position: null,
    created_at: "2021-10-27T10:53:49.000Z",
    updated_at: "2021-11-09T04:49:25.000Z",
    updated_by: "awsm.user03@pethlab.com.my",
  },
  address: {
    site_id: "RYP0054",
    site_name: "SUNGAI BAKAP",
    sold_to_party: "0090000039",
    sold_to_company: "SRI JAWI",
    address: {
      id: 291725,
      city: "Sungai Jawi",
      state: "Pulau Pinang",
      country: "MYS",
      postcode: 14200,
      latitude: 5.210149,
      longitude: 100.49727,
      region_name: "North 1",
      region_group: "Northern",
      address_1: "LOT 573 & 574, MUKIM II SUNGAI BAKAP, SG JAWI, PULAU PINANG",
      address_2: "SG JAWI SG BAKAP",
      address_3: null,
      created_at: "2021-11-24T10:01:23.000Z",
      updated_at: "2021-11-24T10:01:23.000Z",
    },
    cluster: "3.03",
    alternative_cluster: " ",
    border: true,
    speed: 9992,
    cloud: "3",
  },
  status: {
    status_awsm: "Temporarily Closed",
    sales_inventory_data_source: "SENTINEL",
    sales_inventory_data_source_items: [
      "SENTINEL",
      "TESTUPLOAD",
      "2312",
      "ABC",
      null,
    ],
    close_period: {
      id: 14637,
      type: "range",
      time_from: "00:30:00",
      time_to: "00:30:00",
      date_from: "2021-10-29",
      date_to: "2021-10-11",
      days: "",
    },
  },
  storage: {
    end_of_day: {
      id: 14638,
      type: "daily",
      time_from: null,
      time_to: "02:30:00",
      date_from: null,
      date_to: null,
      days: "",
    },
    storage_1: {
      id: 1580,
      tank_capacity: 54000,
      active_product: "INACTIVE",
      tank_status: null,
      ordering_category: "181021",
      terminal: "M818",
      distance: 28,
      duration: 2.5,
      remarks: null,
      sales_category: "Normal",
      product_code_quota: null,
      monthly_fixed_quota: 10000,
      name: "PRIMAX 95",
      code: "70020771",
      ordering_category_items: [
        "181021",
        "zz",
        null,
        "UPLOAD",
        "ACTIVE",
        "ASR",
        "CAt 1",
      ],
    },
    storage_2: {
      id: 1582,
      tank_capacity: 27000,
      active_product: "zzz",
      tank_status: null,
      ordering_category: "zz",
      terminal: "M818",
      distance: 28,
      duration: 1,
      remarks: null,
      sales_category: "LV1",
      product_code_quota: null,
      monthly_fixed_quota: 234,
      name: "PRIMAX 97",
      code: "70000011",
      ordering_category_items: [
        "181021",
        "zz",
        null,
        "UPLOAD",
        "ACTIVE",
        "ASR",
        "CAt 1",
      ],
    },
    storage_3: {
      id: 2160,
      tank_capacity: 27000,
      active_product: null,
      tank_status: null,
      ordering_category: null,
      terminal: "M818",
      distance: 28,
      duration: null,
      remarks: null,
      sales_category: "LV1",
      product_code_quota: null,
      monthly_fixed_quota: null,
      name: "BIODIESEL B10 EURO 5",
      code: "70100993",
      ordering_category_items: [
        "181021",
        "zz",
        null,
        "UPLOAD",
        "ACTIVE",
        "ASR",
        "CAt 1",
      ],
    },
  },
  delivery: {
    road_tanker_requirement: "181021,ROAD 1",
    road_tanker_requirement_items: [
      "181021",
      "ROAD 1",
      "ROAD 2",
      "testnajib",
      "LD-S",
      "1",
      "Test RTR",
      null,
    ],
    road_tanker_accessibility: 32760,
    delivery_open_time_1: {
      id: 13253,
      type: "daily",
      time_from: "00:00:00",
      time_to: "23:59:00",
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_1: {
      id: 13254,
      type: "daily",
      time_from: "00:00:00",
      time_to: "00:00:00",
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_2: {
      id: 13255,
      type: "daily",
      time_from: "00:00:00",
      time_to: "00:00:00",
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_3: {
      id: 14253,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_4: {
      id: 14259,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_5: {
      id: 14261,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
    actual_open_time_1: {
      id: 14612,
      type: "every",
      time_from: "23:00:00",
      time_to: "02:00:00",
      date_from: null,
      date_to: null,
      days: ["Monday", "Tuesday"],
    },
    actual_open_time_2: {
      id: 14636,
      type: "every",
      time_from: "23:00:00",
      time_to: "02:00:00",
      date_from: null,
      date_to: null,
      days: ["Monday", "Tuesday"],
    },
  },
}
describe("testing TableInformation", () => {
  window.location.pathname = "/retail-customer"
  const mockFunction = jest.fn()
  it("render TabAddress without crashing", () => {
    render(<TabAddress />)
  })
  it("render TabAddress with data", () => {
    render(<TabAddress data={mockData} onChange={mockFunction}/>)
  })
  it("render TabContact without crashing", () => {
    render(<TabContact />)
  })
  it("render TabContact with data", () => {
    render(<TabContact data={mockData} />)
  })
  it("render TabQuota without crashing", () => {
    render(<TabQuota />)
  })
  it("render TabQuota with data", () => {
    render(<TabQuota data={mockData} />)
  })
  it("render TabStatus without crashing", () => {
    render(<TabStatus />)
  })
  it("render TabStatus with data", () => {
    render(<TabStatus data={mockData} />)
  })
  it("render TabStorage without crashing", () => {
    render(<TabStorage scheduler={true}/>)
  })
  it("render TabStorage with data", () => {
    render(<TabStorage scheduler={false} data={mockData} />)
  })
  it("render TabDelivery without crashing", () => {
    render(<TabDelivery />)
  })
  it("render TabDelivery with data", () => {
    render(<TabDelivery data={mockData} />)
  })
})
