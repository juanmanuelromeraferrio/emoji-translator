import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Emoji from "../src/components/Emoji";

describe("Emoji", () => {
    const testEmoji = "😀";

    test("renders emoji and copy button", () => {
        render(<Emoji emoji={testEmoji} />);

        expect(screen.getByText(testEmoji)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /copy to clipboard/i })).toBeInTheDocument();
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

        render(<Emoji emoji={testEmoji} />);
        const copyButton = screen.getByRole("button", { name: /copy to clipboard/i });

        fireEvent.click(copyButton); // Use fireEvent instead of userEvent

        expect(clipboardWriteTextMock).toHaveBeenCalledWith(testEmoji);
        expect(copyButton).toHaveTextContent(/copied!/i);

        await waitFor(() => expect(copyButton).toHaveTextContent(/copy to clipboard/i), { timeout: 2100 });

        clipboardWriteTextMock.mockRestore();
    });
});
