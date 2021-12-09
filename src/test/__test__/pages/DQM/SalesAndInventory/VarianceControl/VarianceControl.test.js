import VarianceControl from "pages/DQM/SalesAndInventory/VarianceControl"
import React from "react"
import store from "../../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing VarianceControl", () => {
  it("render VarianceControl without crashing", () => {
    render(
      <Provider store={store}>
        <VarianceControl />
      </Provider>
    )
  })
})
