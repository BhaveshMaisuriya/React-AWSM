import HorizontalLayout from "components/HorizontalLayout"
import React from "react"
import store from "../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

describe("testing HorizontalLayout ", () => {
  it("render HorizontalLayout without crashing", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HorizontalLayout />
        </Provider>
      </BrowserRouter>
    )
  })
})
