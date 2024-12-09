import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach, Mock } from "vitest";
import Login from "../../src/pages/Login";
import { authenticateUser } from "../../src/api";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest"; // Import necessary matcher extensions

// Mock the authenticateUser function
vi.mock("../../src/api", () => ({
  authenticateUser: vi.fn()
}));

// Mock the useNavigate hook to simulate navigation
const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => navigate),
    MemoryRouter: actual.MemoryRouter
  };
});

describe("Login Component", () => {
  const onLoginSuccess = vi.fn();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  beforeEach(() => {
    // Reset navigate mock before each test
    vi.clearAllMocks();
  });

  it("should render the Login form and Back button", () => {
    render(
      <MemoryRouter>
        <Login onLoginSuccess={onLoginSuccess} />
      </MemoryRouter>
    );

    // Assert the form elements are present
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("should call onLoginSuccess and navigate to home on successful login", async () => {
    // Mock the authenticateUser function to return a successful token
    (authenticateUser as Mock).mockResolvedValueOnce("fake-token");

    render(
      <MemoryRouter>
        <Login onLoginSuccess={onLoginSuccess} />
      </MemoryRouter>
    );

    // Fill in login form
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "user" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } });

    // Simulate the login button click
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the navigation to happen
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/"));

    // Ensure onLoginSuccess is called
    expect(onLoginSuccess).toHaveBeenCalledTimes(1);
  });

  it("should display an error message when login fails", async () => {
    // Mock the authenticateUser function to simulate login failure
    (authenticateUser as Mock).mockRejectedValueOnce(new Error("Invalid credentials"));

    render(
      <MemoryRouter>
        <Login onLoginSuccess={onLoginSuccess} />
      </MemoryRouter>
    );

    // Fill in login form
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "user" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } });

    // Simulate the login button click
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/Invalid credentials/i));

    // Assert the error message is displayed
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  it("should navigate to home when clicking the Back button", () => {
    render(
      <MemoryRouter>
        <Login onLoginSuccess={onLoginSuccess} />
      </MemoryRouter>
    );

    // Simulate clicking the Back button
    fireEvent.click(screen.getByRole("button", { name: /back/i }));

    // Assert that navigate was called with the correct URL
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
