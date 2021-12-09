import ProductListPage from "pages/DQM/ProductList"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing product page", () => {
  it("render product page without crashing", () => {
    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    )
  })
})
