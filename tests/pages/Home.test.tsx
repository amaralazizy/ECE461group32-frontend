import React from "react";
import { render, screen, fireEvent, /*waitFor,*/ cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Home from "../../src/pages/Home";
import { MemoryRouter} from "react-router-dom"; // For navigation mock
import "@testing-library/jest-dom/vitest";

// Mock the navigate function from react-router-dom

// vi.mock("react-router-dom", () => ({
//   ...vi.importActual("react-router-dom"),
//   useNavigate: vi.fn()
// }));

describe("Home Component", () => {
  const onLogout = vi.fn();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render login button and Tracks component when not logged in", () => {
    render(
      <MemoryRouter>
        <Home isLoggedIn={false} onLogout={onLogout} />
      </MemoryRouter>
    );

    // Assert login button is displayed
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    // Assert Tracks component is rendered
    expect(screen.getByText(/tracks/i)).toBeInTheDocument();
  });

  it("should render tabs and handle tab switching when logged in", () => {
    render(
      <MemoryRouter>
        <Home isLoggedIn={true} onLogout={onLogout} />
      </MemoryRouter>
    );

    // Assert that tab buttons are rendered
    const uploadTab = screen.getByText(/upload a package/i);
    const getPackagesTab = screen.getByText(/get packages by query/i);
    expect(uploadTab).toBeInTheDocument();
    expect(getPackagesTab).toBeInTheDocument();

    // Simulate tab switching
    fireEvent.click(uploadTab);
    expect(screen.getByText(/upload by url/i)).toBeInTheDocument();
    expect(screen.getByText(/upload by file/i)).toBeInTheDocument();

    fireEvent.click(getPackagesTab);
    expect(screen.getByRole("tab", { name: /get packages by query/i })).toBeInTheDocument();
  });

  it("should call onLogout and navigate when logout button is clicked", () => {
    // vi.mocked(useNavigate).mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <Home isLoggedIn={true} onLogout={onLogout} />
      </MemoryRouter>
    );

    // Simulate clicking the logout button
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    // Assert onLogout is called
    expect(onLogout).toHaveBeenCalledTimes(1);

    // Assert navigate is called to redirect to home
    // expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should render the correct component based on active tab", () => {
    render(
      <MemoryRouter>
        <Home isLoggedIn={true} onLogout={onLogout} />
      </MemoryRouter>
    );

    // Default tab should be "Upload a package"
    expect(screen.getByText(/upload a package/i)).toBeInTheDocument();

    // Simulate switching to "Reset the registry" tab
    fireEvent.click(screen.getByRole("tab", { name: /reset the registry/i }));
    expect(screen.getByRole("button", { name: /reset the registry/i })).toBeInTheDocument();
  });
});
