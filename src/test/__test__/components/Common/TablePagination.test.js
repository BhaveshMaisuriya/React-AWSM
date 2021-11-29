import React from "react"
import { render, screen } from "@testing-library/react"
import Pagination from "components/Common/Pagination"
import userEvent from "@testing-library/user-event"
// import '@testing-library/jest-dom'

describe("testing pagination component", () => {
  test("renders pagination component with crashing", () => {
    render(
      <Pagination
        rowsPerPage={10}
        currentPage={1}
        onChangePage={() => {}}
        totalPages={10}
      />
    )
  })
  test("renders pagination component with more than 19 pages", () => {
    render(
      <Pagination
        rowsPerPage={10}
        currentPage={99}
        onChangePage={() => {}}
        totalPages={100}
      />
    )
    // const dotsGap = screen.getByText("...")
    // expect(dotsGap).toBeInTheDocument()
  })
  test("test pagination onclick", () => {
    const mockFn = jest.fn()
    let currentPageNumber = 1
    render(
      <Pagination
        rowsPerPage={10}
        currentPage={currentPageNumber}
        onChangePage={mockFn}
        totalPages={10}
      />
    )
    const buttonElement = screen.getByText("2");
    const backButton = screen.getByLabelText("Previous Page")
    const nextButton = screen.getByLabelText("Next Page")
    userEvent.click(buttonElement)
    userEvent.click(backButton)
    userEvent.click(nextButton)
    expect(mockFn).toBeCalledTimes(3)
  })
})
