import TerminalPage from "pages/DQM/Terminal"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing terminal page", () => {
  it("render terminal page without crashing", () => {
    render(
      <Provider store={store}>
        <TerminalPage />
      </Provider>
    )
  })
})
