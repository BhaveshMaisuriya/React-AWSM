import PopOverCalendar from "components/Common/TableInformation/components/PopOverCalendar"
import React from "react"
// import store from "../../../../store"
import { render } from "@testing-library/react"
// import { Provider } from "react-redux"

describe("testing PopOverCalendar", () => {
  it("render PopOverCalendar without crashing", () => {
    render(
      // <Provider store={store}>
      <PopOverCalendar />
      // </Provider>
    )
  })
})
