import SLAPage from "pages/DQM/SLA"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing sla page", () => {
  it("render sla page without crashing", () => {
    render(
      <Provider store={store}>
        <SLAPage />
      </Provider>
    )
  })
})
