import TerminalDetailModal from "pages/DQM/Terminal/TerminalDetailModal"
import AddressTab from "pages/DQM/Terminal/AddressTab"
import StorageTab from "pages/DQM/Terminal/StorageTab"
import ContactTab from "pages/DQM/Terminal/ContactTab"
import StatusTab from "pages/DQM/Terminal/StatusTab"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

const mockData = {
  code: "M808",
  name: "PDB KVDT Fuel Terminal",
  remarks: "testy",
  updated_at: "2021-12-08T01:36:42.000Z",
  updated_by: "awsm.user03@pethlab.com.my",
  address: {
    id: 380396,
    city: "Dengkil",
    state: "Selangor",
    country: "MYS",
    postcode: 43800,
    latitude: 2.954548423,
    longitude: 101.6635323,
    region_name: "Central 2",
    region_group: "Central",
    address_1: "LOT 5334/5006",
    address_2: null,
    address_3: null,
  },
  storage: {
    loading_bay_no: 12,
    max_volume_threshold: 5,
    loading_time: 30,
    turnaround_time: 30,
    product_dropdown: [
      { code: "70000003", name: "AVGAS 100 (BULK)", status_sap: "Active", status_awsm: "Active" },
      { code: "70000011", name: "PRIMAX 97", status_sap: "Active", status_awsm: "Active" },
      { code: "70000015", name: "JET A-1 (BULK)", status_sap: "Active", status_awsm: "Active" },
      { code: "70000018", name: "KEROSENE (BULK)", status_sap: "Active", status_awsm: "Active" },
      { code: "70000020", name: "DIESEL EURO 2M", status_sap: "Active", status_awsm: "Active" },
      {
        code: "70000023",
        name: "FUEL OIL 180CST (BULK)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70000028",
        name: "FUEL OIL-BLENDED 80CST (BULK)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70008150",
        name: "AVTUR (JET A-1 WITH ADDITIVE)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70020383",
        name: "BIODIESEL B7 (COMM)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      { code: "70020771", name: "PRIMAX 95", status_sap: "Active", status_awsm: "Active" },
      {
        code: "70022419",
        name: "DIESEL,AUTOMOTIVE EURO 2M",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70022486",
        name: "PETRONAS BITUMEN 80/100",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100025",
        name: "BIODIESEL B10 WITHOUT ADDITIVE",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100157",
        name: "BIODIESEL B7 -RETAIL (CAMERON HIGHLANDS)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      { code: "70100322", name: "DIESEL EURO 5", status_sap: "Active", status_awsm: "Active" },
      {
        code: "70100454",
        name: "BIODIESEL B7 EURO5 WITH ADDITIVE",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100582",
        name: "DIESEL,AUTOMOTIVE EURO 5",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100632",
        name: "BIODIESEL B7 EURO5 (COMM)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100701",
        name: "BIODIESEL B10 COMM (with additive)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      { code: "70100702", name: "BIODIESEL B20 COMM", status_sap: "Active", status_awsm: "Active" },
      {
        code: "70100780",
        name: "BIODIESEL B7 (COMM) WITH ADDITIVE",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100802",
        name: "BIODIESEL B20 EURO5 (COMM)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100992",
        name: "BIODIESEL B20 EURO 5",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100993",
        name: "BIODIESEL B10 EURO 5",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70100995",
        name: "BIODIESEL B10 EURO 5 (COMM)",
        status_sap: "Active",
        status_awsm: "Active",
      },
      {
        code: "70101001",
        name: "BIODIESEL B10 EURO 5 (C) WITH ADDITIVE",
        status_sap: "Active",
        status_awsm: "Active",
      },
    ],
    product_1: {
      id: 368,
      status_awsm: "Active",
      terminal_product_density: 838.9,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "BIODIESEL B7 EURO5 WITH ADDITIVE",
      code: "70100454",
    },
    product_2: {
      id: 369,
      status_awsm: "Active",
      terminal_product_density: 838.9,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "DIESEL EURO 5",
      code: "70100322",
    },
    product_3: {
      id: 370,
      status_awsm: "Active",
      terminal_product_density: 735.8,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "PRIMAX 95",
      code: "70020771",
    },
    product_4: {
      id: 371,
      status_awsm: "Active",
      terminal_product_density: 838.9,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "BIODIESEL B7 EURO5 (COMM)",
      code: "70100632",
    },
    product_5: {
      id: 372,
      status_awsm: "Active",
      terminal_product_density: 838.9,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "BIODIESEL B10 EURO 5",
      code: "70100993",
    },
    product_6: {
      id: 373,
      status_awsm: "Active",
      terminal_product_density: 838.9,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "BIODIESEL B10 EURO 5 (C) WITH ADDITIVE",
      code: "70101001",
    },
    product_7: {
      id: 374,
      status_awsm: "Active",
      terminal_product_density: 838.9,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "BIODIESEL B10 EURO 5 (COMM)",
      code: "70100995",
    },
    product_8: {
      id: 375,
      status_awsm: "Active",
      terminal_product_density: 838.9,
      volume_capping_date_range: null,
      volume_capping_date_range_2: null,
      volume_capping_volume: null,
      volume_capping_remarks: null,
      volume_capping_volume_2: null,
      volume_capping_remarks_2: null,
      volume_capping_date_range_relation: null,
      volume_capping_date_range_2_relation: null,
      name: "DIESEL,AUTOMOTIVE EURO 5",
      code: "70100582",
    },
  },
  status: {
    status_awsm: "Active",
    terminal_operating_days_1: {
      id: 10160,
      type: "",
      time_from: "00:30:00",
      time_to: "23:30:00",
      date_from: null,
      date_to: null,
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    inactive_date_range_1: {
      id: 10161,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_1: {
      id: 10197,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_2: {
      id: 10198,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_3: {
      id: 10199,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
    no_delivery_interval_4: {
      id: 10200,
      type: "",
      time_from: null,
      time_to: null,
      date_from: null,
      date_to: null,
      days: "",
    },
  },
  contact: {
    supervisor: {
      id: 5819,
      name: "Mohammad Said bin Mokhty",
      number: "+60 16-809 9385",
      email: "msaid.mokhty@petronas.com.my",
      position: null,
      updated_by: null,
    },
    superintendant: {
      id: 5805,
      name: "NIL",
      number: "0",
      email: "",
      position: null,
      updated_by: null,
    },
  },
}

describe("testing TerminalDetailModal", () => {
  const mockFn = jest.fn()
  it("render TerminalDetailModal without crashing", () => {
    const mockData = { code: "123123" }
    render(
      <Provider store={store}>
        <TerminalDetailModal data={mockData} />
      </Provider>
    )
  })
  it("render StorageTab without crashing", () => {
    render(<StorageTab data={mockData.storage} />)
  })
  it("render AddressTab without crashing", () => {
    render(<AddressTab data={mockData.address} onChange={mockFn} />)
  })
  it("render ContactTab without crashing", () => {
    render(<ContactTab data={mockData.contact} onChange={mockFn} />)
  })
  it("render StatusTab without crashing", () => {
    render(
      <StatusTab
        data={mockData.status}
        forceBlur={{ inactive_date_range_1: false }}
        onChange={mockFn}
      />
    )
  })
})
