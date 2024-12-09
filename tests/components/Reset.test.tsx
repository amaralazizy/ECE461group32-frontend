import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, Mock } from "vitest";
import Reset from "../../src/components/Reset";
import "@testing-library/jest-dom/vitest";
import { resetRegistry } from "../../src/api";

vi.mock("../../src/api", () => ({
  resetRegistry: vi.fn()
}));

describe("Reset Component", () => {

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });
  it("should display a success message when registry is reset", async () => {
    (resetRegistry as Mock).mockResolvedValueOnce({ ok: true });

    render(<Reset ariaLabel="Reset Component" />);

    // Simulate button click
    fireEvent.click(screen.getByText(/reset the registry/i));

    // Wait for the response message to appear
    await waitFor(() => screen.getByText(/registery reset successfully./i));

    // Assert that the success message is displayed
    expect(screen.getByText(/registery reset successfully./i)).toBeInTheDocument();
  });

  it("should display an error message when the registry reset fails", async () => {
    // Mock the resetRegistry function to return a failed response
    (resetRegistry as Mock).mockResolvedValueOnce({ ok: false });

    render(<Reset ariaLabel="Reset Component" />);

    // Simulate button click
    fireEvent.click(screen.getByText(/reset the registry/i));

    // Wait for the response message to appear
    await waitFor(() => screen.getByText(/failed to reset the registery. please try again./i));

    // Assert that the error message is displayed
    expect(screen.getByText(/failed to reset the registery. please try again./i)).toBeInTheDocument();
  });

  it("should display an error message when an exception is thrown", async () => {
    // Mock the resetRegistry function to throw an error
    (resetRegistry as Mock).mockRejectedValueOnce(new Error("API error"));

    render(<Reset ariaLabel="Reset Component" />);

    // Simulate button click
    fireEvent.click(screen.getByText(/reset the registry/i));

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/failed to reset the registery. please try again./i));

    // Assert that the error message is displayed
    expect(screen.getByText(/failed to reset the registery. please try again./i)).toBeInTheDocument();
  });
});
