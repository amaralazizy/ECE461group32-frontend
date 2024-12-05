import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Rate from "../../src/components/Rate"; // Adjust the path if necessary
import "@testing-library/jest-dom/vitest";
import { getPackageRate } from "../../src/api"; // Mock the API call

vi.mock("../../src/api", () => ({
  getPackageRate: vi.fn(),
}));

describe("Rate Component Suite", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the Rate component", () => {
    const { unmount } = render(<Rate />);
    expect(screen.getByText(/get package rate by id/i)).toBeInTheDocument();
    unmount();
  });

  it("displays an error message if the package ID is empty", async () => {
    const { unmount } = render(<Rate />);
    const button = screen.getByRole("button", { name: /get package rate/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Please enter a package ID.")).toBeInTheDocument();
    });

    unmount();
  });

  it("calls getPackageRate API with the correct package ID", async () => {
    const mockRate = { rate: 4.5 };
    getPackageRate.mockResolvedValueOnce(mockRate);

    const { unmount } = render(<Rate />);
    const input = screen.getByLabelText(/get package rate by id/i);
    const button = screen.getByRole("button", { name: /get package rate/i });

    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getPackageRate).toHaveBeenCalledWith("123");
      expect(screen.getByText(/package rate retrieved successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/package rate: 4.5/i)).toBeInTheDocument();
    });

    unmount();
  });

  it("displays error message if the getPackageRate call fails", async () => {
    getPackageRate.mockRejectedValueOnce(new Error("Failed to get package rate"));

    const { unmount } = render(<Rate />);
    const input = screen.getByLabelText(/get package rate by id/i);
    const button = screen.getByRole("button", { name: /get package rate/i });

    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("An error occurred. Please try again later.")).toBeInTheDocument();
    });

    unmount();
  });

  it("displays the rate successfully when Enter is pressed", async () => {
    const mockRate = { rate: 3.8 };
    getPackageRate.mockResolvedValueOnce(mockRate);

    const { unmount } = render(<Rate />);
    const input = screen.getByLabelText(/get package rate by id/i);

    fireEvent.change(input, { target: { value: "456" } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

    await waitFor(() => {
      expect(getPackageRate).toHaveBeenCalledWith("456");
      expect(screen.getByText(/package rate: 3.8/i)).toBeInTheDocument();
    });

    unmount();
  });
});
