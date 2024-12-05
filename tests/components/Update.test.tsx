import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Update from "../../src/components/Update"; // Adjust the path if necessary
import "@testing-library/jest-dom/vitest";
import { updatePackageById } from "../../src/api"; // Mock the API call

vi.mock("../../src/api", () => ({
  updatePackageById: vi.fn()
}));

describe("Update Component Suite", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the Update Package component", () => {
    const { unmount } = render(<Update />);
    expect(screen.getByText(/update package by id/i)).toBeInTheDocument();
    unmount();
  });

  it("allows user to input package ID and update data", () => {
    const { unmount } = render(<Update />);

    // Package ID input
    const packageIdInput = screen.getByLabelText(/update package by id/i);
    fireEvent.change(packageIdInput, { target: { value: "123" } });
    expect(packageIdInput).toHaveValue("123");

    // Update Data input
    const updateDataInput = screen.getByPlaceholderText(/enter update data/i);
    fireEvent.change(updateDataInput, { target: { value: '{"name": "Test Package"}' } });
    expect(updateDataInput).toHaveValue('{"name": "Test Package"}');

    unmount();
  });

  it("shows error message if package ID or update data is missing", async () => {
    const { unmount } = render(<Update />);
    const updateButton = screen.getByRole("button", { name: /update package/i });

    // Click update button without entering package ID and update data
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter both package id and data to update/i)).toBeInTheDocument();
    });

    unmount();
  });

  it("calls updatePackageById API and shows success message on successful update", async () => {
    updatePackageById.mockResolvedValueOnce({ status: 200 });

    const { unmount } = render(<Update />);
    const packageIdInput = screen.getByLabelText(/update package by id/i);
    const updateDataInput = screen.getByPlaceholderText(/enter update data/i);
    const updateButton = screen.getByRole("button", { name: /update package/i });

    // Fill out form
    fireEvent.change(packageIdInput, { target: { value: "123" } });
    fireEvent.change(updateDataInput, { target: { value: '{"name": "Updated Package"}' } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updatePackageById).toHaveBeenCalledWith("123", { name: "Updated Package" });
      expect(screen.getByText(/package updated successfully/i)).toBeInTheDocument();
    });

    unmount();
  });

  it("shows error message when updatePackageById API fails", async () => {
    updatePackageById.mockRejectedValueOnce(new Error("Failed to update package"));

    const { unmount } = render(<Update />);
    const packageIdInput = screen.getByLabelText(/update package by id/i);
    const updateDataInput = screen.getByPlaceholderText(/enter update data/i);
    const updateButton = screen.getByRole("button", { name: /update package/i });

    // Fill out form
    fireEvent.change(packageIdInput, { target: { value: "123" } });
    fireEvent.change(updateDataInput, { target: { value: '{"name": "Updated Package"}' } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updatePackageById).toHaveBeenCalledWith("123", { name: "Updated Package" });
      expect(screen.getByText(/an error occurred\. please try again later\./i)).toBeInTheDocument();
    });

    unmount();
  });
});
