import VerticalLayout from "components/VerticalLayout"
import React from "react"
import store from "../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

describe("testing VerticalLayout ", () => {
  it("render VerticalLayout without crashing", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <VerticalLayout />
        </Provider>
      </BrowserRouter>
    )
  })
})
