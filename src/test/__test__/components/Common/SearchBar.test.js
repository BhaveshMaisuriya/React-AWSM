import SearchBar from "components/Common/SearchBar"
import React from "react"
import { render } from "@testing-library/react"

describe("testing searchbar", () => {
  it("render searchbar without crashing", () => {
    const mockOnClick = jest.fn()
    const mockOnChange = jest.fn()
    render(<SearchBar searchOnChangeHandler={mockOnChange} searchOnClickHandler={mockOnClick} />)
  })
})
