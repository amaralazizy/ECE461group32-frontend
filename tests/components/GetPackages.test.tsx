import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, Mock } from "vitest";
import GetPackages from "../../src/components/GetPackages";
import "@testing-library/jest-dom/vitest";
import { getPackages } from "../../src/api";
vi.mock("../../src/api", () => ({
  getPackages: vi.fn(),
}));

describe("GetPackages Component Suite", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the GetPackages component", () => {
    const { unmount } = render(<GetPackages ariaLabel="testLabel" />);
    expect(screen.getByText(/get packages by query/i)).toBeInTheDocument();
    unmount();
  });

  it("calls getPackages with the correct arguments when querying packages", async () => {
    const mockData = "Packages found";
    (getPackages as Mock).mockResolvedValueOnce(mockData);

    const { unmount } = render(<GetPackages ariaLabel="testLabel" />);

    // Set query and number of pages
    fireEvent.change(screen.getByLabelText("Get Packages by query"), { target: { value: '"Test Query"' } });
    fireEvent.change(screen.getByLabelText("Number of Pages"), { target: { value: 2 } });

    // Click on the "Query Package" button
    fireEvent.click(screen.getByRole("button", { name: /query package/i }));

    // Wait for the async call to complete and verify
    await waitFor(() => {
      expect(getPackages).toHaveBeenCalledWith(JSON.parse('"Test Query"'), 2);
      expect(screen.getByText(`"${mockData}"`)).toBeInTheDocument();
    });

    unmount();
  });

  it("displays an error message if no packages are found", async () => {
    (getPackages as Mock).mockResolvedValueOnce(null);

    const { unmount } = render(<GetPackages ariaLabel="testLabel" />);

    // Set query and number of pages
    fireEvent.change(screen.getByLabelText("Get Packages by query"), { target: { value: '"Invalid Query"' } });
    fireEvent.change(screen.getByLabelText("Number of Pages"), { target: { value: 1 } });

    // Click on the "Query Package" button
    fireEvent.click(screen.getByRole("button", { name: /query package/i }));

    // Wait for the async call to complete and verify
    await waitFor(() => {
      expect(screen.getByText("No packages found")).toBeInTheDocument();
    });

    unmount();
  });

  it("displays an error message when the getPackages call fails", async () => {
    (getPackages as Mock).mockRejectedValueOnce(new Error("Failed to fetch packages"));

    const { unmount } = render(<GetPackages ariaLabel="testLabel" />);

    // Set query and number of pages
    fireEvent.change(screen.getByLabelText("Get Packages by query"), { target: { value: '"Test Query"' } });
    fireEvent.change(screen.getByLabelText("Number of Pages"), { target: { value: 1 } });

    // Click on the "Query Package" button
    fireEvent.click(screen.getByRole("button", { name: /query package/i }));

    // Wait for the async call to complete and verify
    await waitFor(() => {
      expect(screen.getByText("An error occurred while fetching packages")).toBeInTheDocument();
    });

    unmount();
  });

  it("displays response message when Enter is pressed in the textarea", async () => {
    const mockData = "Packages found";
    (getPackages as Mock).mockResolvedValueOnce(mockData);

    const { unmount } = render(<GetPackages ariaLabel="testLabel"/>);

    // Set query and trigger "Enter" key
    fireEvent.change(screen.getByLabelText("Get Packages by query"), { target: { value: '"Test Query"' } });
    fireEvent.keyPress(screen.getByLabelText("Get Packages by query"), { key: 'Enter', code: 'Enter', charCode: 13 });

    // Wait for the async call to complete and verify
    await waitFor(() => {
      expect(getPackages).toHaveBeenCalledWith(JSON.parse('"Test Query"'), 1);
      expect(screen.getByText(`"${mockData}"`)).toBeInTheDocument();
    });

    unmount();
  });
});
