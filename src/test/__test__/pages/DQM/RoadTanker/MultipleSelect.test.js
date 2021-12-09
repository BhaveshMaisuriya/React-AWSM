import MultipleSelect from "pages/DQM/RoadTanker/MultipleSelect"
import React from "react"
import { render } from "@testing-library/react"

describe("testing MultipleSelect", () => {
  it("render MultipleSelect without crashing", () => {
    render(<MultipleSelect />)
  })
})
