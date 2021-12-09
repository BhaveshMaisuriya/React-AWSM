import Table from "pages/DQM/SLA/table"
import React from "react"
import { render } from "@testing-library/react"

describe("testing Table", () => {
  it("render Table without crashing", () => {
    render(<Table />)
  })
})
