import RetailPage from "pages/DQM/RetailCustomer"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing retail page", () => {
  it("render retail page without crashing", () => {
    render(
      <Provider store={store}>
        <RetailPage />
      </Provider>
    )
  })
})
