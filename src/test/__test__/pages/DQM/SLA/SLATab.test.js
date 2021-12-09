import SLATab from "pages/DQM/SLA/SLATab"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing SLATab", () => {
  it("render SLATab without crashing", () => {
    render(
      <Provider store={store}>
        <SLATab />
      </Provider>
    )
  })
})
