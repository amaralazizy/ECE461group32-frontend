import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, Mock } from "vitest";
import GetPackage from "../../src/components/GetPackage"; // Adjust path if needed
import "@testing-library/jest-dom/vitest";
import { getPackageById, searchPackagesByRegEx } from "../../src/api"; // Adjust path if needed

vi.mock("../../src/api", () => ({
  getPackageById: vi.fn(),
  searchPackagesByRegEx: vi.fn()
}));

describe("GetPackage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders buttons to search by ID and regex", () => {
    const { unmount } = render(<GetPackage ariaLabel="testLabel" />);

    expect(screen.getByText("Search by ID")).toBeInTheDocument();
    expect(screen.getByText("Search by Regex")).toBeInTheDocument();

    unmount(); // Clean up the component
  });

  it("calls getPackageById when searching by ID", async () => {
    // const mockData = { data: { Content: "packageContent" }, metadata: { Name: "Package 1" } };
    const mockData = [{ id: "1", name: "Package 1" }];
    (getPackageById as Mock).mockResolvedValueOnce(mockData);

    const { unmount } = render(<GetPackage ariaLabel="testLabel" />);

    fireEvent.click(screen.getByRole("button", { name: /search by id/i }));
    fireEvent.change(screen.getByLabelText("Package ID"), { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /^search$/i }));

    await waitFor(() => {
      expect(getPackageById).toHaveBeenCalledWith("1");
      expect(screen.getByText("Failed to get package by ID")).toBeInTheDocument();
    });

    unmount(); // Clean up the component after the test
  });

  it("calls searchPackagesByRegEx when searching by regex", async () => {
    const mockData = [{ Version: "1.2.3", Name: "Underscore", ID: "underscore" }];
    (searchPackagesByRegEx as Mock).mockResolvedValueOnce(mockData);

    const { unmount } = render(<GetPackage ariaLabel="testLabel" />);

    //   expect(screen.getByRole("button", { name: /search by regex/i })).toBeInTheDocument();

    // Click the "Search by Regex" button to initiate the search form
    fireEvent.click(screen.getByRole("button", { name: /search by regex/i }));

    //   // Find the input field by label and enter the regex value
    fireEvent.change(screen.getByLabelText("Package Regex"), { target: { value: /Underscore/i } });

    //   // Find the search button using the role and click it
    const searchButton = screen.getByRole("button", { name: /^search$/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchPackagesByRegEx).toHaveBeenCalledWith("/Underscore/i");
      expect(
        screen.getByText((content, element) => {
          // Using element.textContent to get the whole text and compare
          return element?.tagName.toLowerCase() === "pre" && content.includes('"Name": "Underscore"');
        })
      ).toBeInTheDocument();
    });

    unmount(); // Clean up the component after the test
  });

  it("displays error message if package ID is empty", async () => {
    const { unmount } = render(<GetPackage ariaLabel="testLabel" />);

    fireEvent.click(screen.getByText("Search by ID"));
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Package ID cannot be empty")).toBeInTheDocument();
    });

    unmount(); // Clean up the component after the test
  });

  it("displays error message if regex is empty", async () => {
    const { unmount } = render(<GetPackage ariaLabel="testLabel" />);

    fireEvent.click(screen.getByText("Search by Regex"));
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Regex cannot be empty")).toBeInTheDocument();
    });

    unmount(); // Clean up the component after the test
  });

  it("displays error message when getPackageById fails", async () => {
    (getPackageById as Mock).mockRejectedValueOnce(new Error("Failed to get package"));

    const { unmount } = render(<GetPackage ariaLabel="testLabel" />);

    fireEvent.click(screen.getByText("Search by ID"));
    fireEvent.change(screen.getByLabelText("Package ID"), { target: { value: "123" } });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Failed to get package by ID")).toBeInTheDocument();
    });

    unmount(); // Clean up the component after the test
  });

  it("displays error message when searchPackagesByRegEx fails", async () => {
    (searchPackagesByRegEx as Mock).mockRejectedValueOnce(new Error("Failed to search packages by regex"));

    const { unmount } = render(<GetPackage ariaLabel="testLabel" />);

    fireEvent.click(screen.getByText("Search by Regex"));
    fireEvent.change(screen.getByLabelText("Package Regex"), { target: { value: "testRegex" } });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Failed to search packages by regex")).toBeInTheDocument();
    });

    unmount(); // Clean up the component after the test
  });
});
