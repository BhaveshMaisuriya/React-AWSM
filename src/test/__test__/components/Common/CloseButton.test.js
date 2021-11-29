import CloseButton from "components/Common/CloseButton"
import React from "react"
import { render } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"

describe("testing auditlog", () => {
  it("render auditlog without crashing", () => {
    const mockFn = jest.fn()
    const closeButton = render(<CloseButton handleClose={mockFn}/>)
  })
})
