import Loader from "components/Common/Loader"
import React from "react"
import { render } from "@testing-library/react"

describe("testing loader", () => {
  it("render loader without crashing", () => {
    render(<Loader />)
  })
})
