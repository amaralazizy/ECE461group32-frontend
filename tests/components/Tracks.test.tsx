import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, Mock } from "vitest";
import Tracks from "../../src/components/Tracks"; // Adjust the path if necessary
import "@testing-library/jest-dom/vitest";
import { getTracks } from "../../src/api"; // Mock the API call

vi.mock("../../src/api", () => ({
  getTracks: vi.fn()
}));

describe("Tracks Component Suite", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the Get Tracks button", () => {
    const { unmount } = render(<Tracks />);
    expect(screen.getByRole("button", { name: /get tracks/i })).toBeInTheDocument();
    unmount();
  });

  it("calls getTracks API and displays tracks when successful", async () => {
    const mockTracks = {
      plannedTracks: ["Track 1", "Track 2", "Track 3"]
    };
    (getTracks as Mock).mockResolvedValueOnce(mockTracks);

    const { unmount } = render(<Tracks />);

    // Click the "Get Tracks" button to fetch tracks
    fireEvent.click(screen.getByRole("button", { name: /get tracks/i }));

    await waitFor(() => {
      expect(getTracks).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/track: track 1/i)).toBeInTheDocument();
      expect(screen.getByText(/track: track 2/i)).toBeInTheDocument();
      expect(screen.getByText(/track: track 3/i)).toBeInTheDocument();
    });

    unmount();
  });

  it("displays an error message when getTracks API fails", async () => {
    (getTracks as Mock).mockRejectedValueOnce(new Error("Failed to fetch tracks"));

    const { unmount } = render(<Tracks />);

    // Click the "Get Tracks" button to fetch tracks
    fireEvent.click(screen.getByRole("button", { name: /get tracks/i }));

    await waitFor(() => {
      expect(getTracks).toHaveBeenCalledTimes(1);
      expect(screen.getByText("An error occurred while fetching tracks")).toBeInTheDocument();
    });

    unmount();
  });

  it("displays a 'No tracks found' message when no tracks are available", async () => {
    (getTracks as Mock).mockResolvedValueOnce(null);

    const { unmount } = render(<Tracks />);

    // Click the "Get Tracks" button to fetch tracks
    fireEvent.click(screen.getByRole("button", { name: /get tracks/i }));

    await waitFor(() => {
      expect(getTracks).toHaveBeenCalledTimes(1);
      expect(screen.getByText("No tracks found")).toBeInTheDocument();
    });

    unmount();
  });
});
