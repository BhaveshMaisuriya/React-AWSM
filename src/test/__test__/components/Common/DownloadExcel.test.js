import DownloadExcel from "components/Common/DownloadExcel"
import React from "react"
import { render } from "@testing-library/react"

describe("testing DownloadExcel", () => {
  it("render DownloadExcel without crashing", () => {
    render(<DownloadExcel />)
  })
})
