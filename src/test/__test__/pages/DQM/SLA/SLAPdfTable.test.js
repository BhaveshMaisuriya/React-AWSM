import SLAPdfTable from "pages/DQM/SLA/SLAPdfTable"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing SLAPdfTable", () => {
  it("render SLAPdfTable without crashing", () => {
    render(
      <Provider store={store}>
        <SLAPdfTable />
      </Provider>
    )
  })
})
