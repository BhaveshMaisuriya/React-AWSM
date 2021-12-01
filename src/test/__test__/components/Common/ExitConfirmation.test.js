import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ExitConfirmation from "components/Common/ExitConfirmation"
import "@testing-library/jest-dom/extend-expect"

describe("testing exit confirmation component", () => {
    test("render exit confirmation component without crashing", () => {
        render(<ExitConfirmation />)
        expect(screen.getByText("Exit Confirmation")).toBeInTheDocument
    })

    test("onclick testing for exit button", () => {
        const mockFn = jest.fn()
        render(<ExitConfirmation onExit={mockFn} />)
        const exitButton = screen.getByText("Exit")

        expect(screen.getByText("Exit Confirmation")).toBeInTheDocument
        userEvent.click(exitButton)
        expect(mockFn).toBeCalledTimes(1)
    })

    test("onclick testing for cancel button", () => {
        const mockFn = jest.fn()
        render(<ExitConfirmation onCancel={mockFn} />)
        const cancelButton = screen.getByText("Cancel")

        expect(screen.getByText("Exit Confirmation")).toBeInTheDocument
        userEvent.click(cancelButton)
        expect(mockFn).toBeCalledTimes(1)
    })
})
