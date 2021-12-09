import InformationModal from "pages/DQM/RoadTanker/InformationModal"
import TrailerTab from "pages/DQM/RoadTanker/TrailerTab"
import AvailabilityTab from "pages/DQM/RoadTanker/AvailabilityTab"
import SpecificationTab from "pages/DQM/RoadTanker/SpecificationTab"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

const mockData = {
  vehicle: "AFJ 7564BC",
  owner: "BCSB",
  max_volume: 32760,
  remarks: "testy",
  uom_volume: "L",
  uom_weight: "KG",
  status_sap: "Inactive",
  updated_at: "2021-12-08T01:37:11.000Z",
  updated_by: "awsm.user03@pethlab.com.my",
  availability: {
    default_terminal: "M818",
    shift_type: null,
    shift_type_dropdown: ["Double", "OH", "Single", "Off"],
    daily_available_hours: null,
    status_awsm: "Temporary Blocked",
    status_awsm_dropdown: ["Active", "Temporary Blocked"],
    terminal_dropdown: [
      "None",
      "M808",
      "M809",
      "M80K",
      "M828",
      "M817",
      "M838",
      "M818",
      "M819",
      "M829",
      "M839",
      "M846",
      "M847",
      "M848",
      "M849",
      "M855",
      "M857",
      "M858",
      "M859",
    ],
    other_terminal_mobilization_1_date: {
      type: "range",
      time_from: null,
      time_to: null,
      date_from: "2021-10-29",
      date_to: "2021-10-26",
      days: "",
    },
    other_terminal_mobilization_1_name: "M808",
    other_terminal_mobilization_2_date: {
      type: "range",
      time_from: null,
      time_to: null,
      date_from: "2021-10-30",
      date_to: "2021-10-21",
      days: "",
    },
    other_terminal_mobilization_2_name: "M80K",
    block_date_range: {
      type: "daily",
      time_from: "00:00:00",
      time_to: "00:00:00",
      date_from: null,
      date_to: null,
      days: "",
    },
  },
  specification: {
    product_type_sap: "MULTIPRD",
    pump_type: "PTO",
    product_type_awsm: "Kerosene",
    product_type_awsm_dropdown: ["Multi Product", "Jet A1", "Kerosene"],
    temporary_product_date_range: {
      id: 15256,
      type: "range",
      time_from: null,
      time_to: null,
      days: "",
      date_from: "2021-11-02",
      date_to: "2021-11-04",
      created_at: "2021-11-26T09:09:27.000Z",
      updated_at: "2021-11-26T09:09:27.000Z",
    },
    chartering_type: "SPOT BCSB",
    customer_type: "Multi",
    customer_type_dropdown: ["All", "Commercial", "Multi"],
    restriction: ["Long Hose", "Highland Road", "PTO"],
    restriction_dropdown: [],
    restriction_code: "6008",
    restriction_code_dropdown: [
      {
        code: "1001",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Long Haul, Long Hose, Pit Stop, Highland Road, PTO, Aluminium Tank",
      },
      {
        code: "1002",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Long Haul, Long Hose, Pit Stop, PTO, Aluminium Tank",
      },
      {
        code: "1003",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Long Haul, Pit Stop, Highland Road, PTO, Aluminium Tank",
      },
      {
        code: "1004",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Long Haul, Long Hose, Highland Road, PTO, Aluminium Tank",
      },
      {
        code: "1005",
        description: "Multi Product, MOGAS, Diesel, Kerosene, Long Haul, PTO, Aluminium Tank",
      },
      {
        code: "1006",
        description: "Multi Product, MOGAS, Diesel, Kerosene, Long Haul, Aluminium Tank",
      },
      {
        code: "1007",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Long Hose, Pit Stop, Highland Road, PTO, Aluminium Tank",
      },
      {
        code: "1008",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Long Hose, Pit Stop, PTO, Aluminium Tank",
      },
      {
        code: "1009",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Pit Stop, Highland Road, PTO, Aluminium Tank",
      },
      {
        code: "1010",
        description:
          "Multi Product, MOGAS, Diesel, Kerosene, Long Hose, Highland Road, PTO, Aluminium Tank",
      },
      {
        code: "1011",
        description: "Multi Product, MOGAS, Diesel, Kerosene, Highland Road, PTO, Aluminium Tank",
      },
      { code: "1012", description: "Multi Product, MOGAS, Diesel, Kerosene, PTO, Aluminium Tank" },
      { code: "1013", description: "Multi Product, MOGAS, Diesel, Kerosene, Aluminium Tank" },
      {
        code: "2001",
        description: "Diesel, Long Haul, Long Hose, Pit Stop, Highland Road, PTO, Mild Steel Tank",
      },
      { code: "2002", description: "Diesel, Long Haul, Long Hose, Pit Stop, PTO, Mild Steel Tank" },
      {
        code: "2003",
        description: "Diesel, Long Haul, Pit Stop, Highland Road, PTO, Mild Steel Tank",
      },
      {
        code: "2004",
        description: "Diesel, Long Haul, Long Hose, Highland Road, PTO, Mild Steel Tank",
      },
      { code: "2005", description: "Diesel, Long Haul, Highland Road, PTO, Mild Steel Tank" },
      { code: "2006", description: "Diesel, Long Haul, Mild Steel Tank" },
      { code: "2007", description: "Diesel, Long Haul, PTO, Mild Steel Tank" },
      {
        code: "2008",
        description: "Diesel, Long Hose, Pit Stop, Highland Road, PTO, Mild Steel Tank",
      },
      { code: "2009", description: "Diesel, Long Hose, Pit Stop, PTO, Mild Steel Tank" },
      { code: "2010", description: "Diesel, Pit Stop, Highland Road, PTO, Mild Steel Tank" },
      { code: "2011", description: "Diesel, Long Hose, Highland Road, PTO, Mild Steel Tank" },
      { code: "2012", description: "Diesel, Highland Road, PTO, Mild Steel Tank" },
      { code: "2013", description: "Diesel, Mild Steel Tank" },
      { code: "2014", description: "Diesel, PTO, Mild Steel Tank" },
      {
        code: "3001",
        description: "Kerosene, Jet A1, Long Haul, Pit Stop, Highland Road, Aluminium Tank",
      },
      { code: "3002", description: "Kerosene, Jet A1, Long Haul, Pit Stop, Aluminium Tank" },
      { code: "3003", description: "Kerosene, Jet A1, Long Haul, Highland Road, Aluminium Tank" },
      { code: "3004", description: "Kerosene, Jet A1, Long Haul, Aluminium Tank" },
      { code: "3005", description: "Kerosene, Jet A1, Pit Stop, Highland Road, Aluminium Tank" },
      { code: "3006", description: "Kerosene, Jet A1, Pit Stop, Aluminium Tank" },
      { code: "3007", description: "Kerosene, Jet A1, Highland Road, Aluminium Tank" },
      { code: "3008", description: "Kerosene, Jet A1, Aluminium Tank" },
      {
        code: "4001",
        description:
          "FUEL OIL, Long Haul, Long Hose, Pit Stop, Highland Road, PTO, Mild Steel Tank",
      },
      {
        code: "4002",
        description: "FUEL OIL, Long Haul, Long Hose, Pit Stop, PTO, Mild Steel Tank",
      },
      {
        code: "4003",
        description: "FUEL OIL, Long Haul, Pit Stop, Highland Road, PTO, Mild Steel Tank",
      },
      {
        code: "4004",
        description: "FUEL OIL, Long Haul, Long Hose, Highland Road, PTO, Mild Steel Tank",
      },
      { code: "4005", description: "FUEL OIL, Long Haul, Highland Road, PTO, Mild Steel Tank" },
      { code: "4006", description: "FUEL OIL, Long Haul, PTO, Mild Steel Tank" },
      { code: "4007", description: "FUEL OIL, Long Haul, Mild Steel Tank" },
      {
        code: "4008",
        description: "FUEL OIL, Long Hose, Pit Stop, Highland Road, PTO, Mild Steel Tank",
      },
      { code: "4009", description: "FUEL OIL, Long Hose, Pit Stop, PTO, Mild Steel Tank" },
      { code: "4010", description: "FUEL OIL, Pit Stop, Highland Road, PTO, Mild Steel Tank" },
      { code: "4011", description: "FUEL OIL, Long Hose, Highland Road, PTO, Mild Steel Tank" },
      { code: "4012", description: "FUEL OIL, Highland Road, PTO, Mild Steel Tank" },
      { code: "4013", description: "FUEL OIL, PTO, Mild Steel Tank" },
      { code: "4014", description: "FUEL OIL, Mild Steel Tank" },
      { code: "5001", description: "LNG, Long Haul, Pit Stop, Highland Road, PTO" },
      { code: "5002", description: "LNG, Long Haul, Pit Stop, PTO" },
      { code: "5003", description: "LNG, Long Haul, Highland Road, PTO" },
      { code: "5004", description: "LNG, Long Haul, PTO" },
      { code: "5005", description: "LNG, Long Haul" },
      { code: "5006", description: "LNG, Pit Stop, Highland Road, PTO" },
      { code: "5007", description: "LNG, Pit Stop, PTO" },
      { code: "5008", description: "LNG, Highland Road, PTO" },
      { code: "5009", description: "LNG, PTO" },
      { code: "5010", description: "LNG" },
      { code: "6001", description: "LPG, Long Haul, Long Hose, Pit Stop, Highland Road, PTO" },
      { code: "6002", description: "LPG, Long Haul, Long Hose, Pit Stop, PTO" },
      { code: "6003", description: "LPG, Long Haul, Long Hose, PTO" },
      { code: "6004", description: "LPG, Long Haul, Long Hose, Highland Road, PTO" },
      { code: "6005", description: "LPG, Long Hose, Pit Stop, Highland Road, PTO" },
      { code: "6006", description: "LPG, Long Hose, Pit Stop, PTO" },
      { code: "6007", description: "LPG, Long Hose, PTO" },
      { code: "6008", description: "Long Hose, Highland Road, PTO" },
    ],
  },
  trailer: {
    max_weight: 39000,
    unladen_weight: 0,
    compartment_no: 6,
    compartment_max_vol: "5460,5460,5460,5460,5460,5460",
    product_weight_hse_compliance: null,
    offloading_duration: 20,
  },
}

describe("testing InformationModal", () => {
  it("render InformationModal without crashing", () => {
    render(
      <Provider store={store}>
        <InformationModal data={mockData} />
      </Provider>
    )
  })
  it("render TrailerTab without crashing", () => {
    render(<TrailerTab data={mockData.trailer} />)
  })
  it("render AvailabilityTab without crashing", () => {
    render(<AvailabilityTab data={mockData.availability} />)
  })
  it("render SpecificationTab without crashing", () => {
    render(<SpecificationTab data={mockData.specification} />)
  })
})
