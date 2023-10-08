import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Emoji from "../src/components/Emoji";

describe("Emoji", () => {
    const testEmojis = ["🔨","🤔"];

    test("renders emoji and copy button", () => {
        render(<Emoji emojis={testEmojis} />);

        expect(screen.getByText(testEmojis[0])).toBeInTheDocument();
        expect(screen.queryByTestId("copy-icon")).toBeInTheDocument()
    });

    test("copies emoji to clipboard and updates button text", async () => {
        // Mock the entire navigator.clipboard object
        const clipboard = {
            writeText: jest.fn(),
        };
        Object.defineProperty(navigator, "clipboard", {
            value: clipboard,
            writable: true,
            enumerable: true,
            configurable: true,
        });

        const clipboardWriteTextMock = jest.spyOn(navigator.clipboard, "writeText").mockImplementation(() => { });

        render(<Emoji emojis={testEmojis} />);
        const copyButton = screen.getByRole("button", { name: /copy to clipboard/i });

        fireEvent.click(copyButton); // Use fireEvent instead of userEvent

        expect(clipboardWriteTextMock).toHaveBeenCalledWith(testEmojis[0]);
        expect(screen.queryByTestId("check-icon")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("copy-icon")).toBeInTheDocument(), { timeout: 2100 });


        clipboardWriteTextMock.mockRestore();
    });
});
