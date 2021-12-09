import CsvFileUpload from "pages/DQM/Common/CsvFileUpload"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing CsvFileUpload", () => {
  it("render CsvFileUpload without crashing", () => {
    render(
      <Provider store={store}>
        <CsvFileUpload />
      </Provider>
    )
  })
})
