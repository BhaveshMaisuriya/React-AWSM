import AuditLog from "components/Common/AuditLog"
import React from "react"
import store from "../../../../store"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

describe("testing auditlog", () => {
  it("render auditlog without crashing", () => {
    render(
      <Provider store={store}>
        <AuditLog />
      </Provider>
    )
  })
})
