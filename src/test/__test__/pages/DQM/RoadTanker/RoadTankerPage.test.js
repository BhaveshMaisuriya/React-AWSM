import RoadTankerPage from "pages/DQM/RoadTanker"
import React from "react"
import store from "../../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing rt page", () => {
  it("render rt page without crashing", () => {
    render(
      <Provider store={store}>
        <RoadTankerPage />
      </Provider>
    )
  })
})
