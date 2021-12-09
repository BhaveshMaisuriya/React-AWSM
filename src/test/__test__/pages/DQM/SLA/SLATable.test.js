import SLATable from "pages/DQM/SLA/SLATable"
import React from "react"
import { render } from "@testing-library/react"

describe("testing SLATable", () => {
  it("render SLATable without crashing", () => {
    render(<SLATable />)
  })
})
