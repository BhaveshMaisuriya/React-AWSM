import CloseButton from "../../../../components/Common/CloseButton"
import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'


describe("testing auditlog", () => {
  it("render auditlog without crashing", () => {
    render(<CloseButton />)
  })
})
