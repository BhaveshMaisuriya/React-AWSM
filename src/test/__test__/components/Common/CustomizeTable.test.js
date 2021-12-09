import CustomizeTable from "components/Common/CustomizeTable"
import React from "react"
import { render } from "@testing-library/react"
import { tableColumns, tableMapping } from "pages/DQM/ProductList/tableMapping.js"
// import userEvent from "@testing-library/user-event"

describe("testing customize table", () => {
  it("render auditlog without crashing", () => {
    const mockFn = jest.fn()
    render(
      <CustomizeTable
        tableName={"product"}
        onChange={mockFn}
        open={true}
        closeDialog={mockFn}
        availableMetric={tableMapping}
        initialMetric={tableColumns}
        defaultMetric={tableColumns}
      />
    )
  })
})
