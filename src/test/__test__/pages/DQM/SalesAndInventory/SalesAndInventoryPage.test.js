import SalesAndInventoryPage from "pages/DQM/SalesAndInventory"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing s&i page", () => {
  it("render s&i page without crashing", () => {
    render(
      <Provider store={store}>
        <SalesAndInventoryPage />
      </Provider>
    )
  })
})
