import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import App from "../src/App";
// import { MemoryRouter } from "react-router-dom"; // For simulating routing
import "@testing-library/jest-dom/vitest"; // For DOM matchers

// Mocking localStorage to control its values during the test
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
} as unknown as Storage;

describe("App Component", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should show the Loading component while loading", () => {
    // Simulate app loading state
    render(
    //   <MemoryRouter>
        <App />
    //   </MemoryRouter>
    );

    // Check that the Loading component is rendered
    waitFor(() => expect(screen.getByText(/loading/i)).toBeInTheDocument());
  });

//   it("should render Login page if not logged in and navigate to Home on successful login", async () => {
//     // Simulate no authToken in localStorage
//     (localStorage.getItem as Mock).mockReturnValue(null);

//     render(
//     //   <MemoryRouter>
//         <App />
//     //   </MemoryRouter>
//     );

//     // Ensure the Login component is rendered
//    await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument());

//     // Simulate login success
//     const loginButton = screen.getByRole("button", { name: /login/i });
//     fireEvent.click(loginButton);

//     // Wait for redirect to Home and check if Home is rendered
//     await waitFor(() => screen.getByText(/ece 461 project/i));
//     expect(screen.getByText(/ece 461 project/i)).toBeInTheDocument();
//   });

  it("should redirect to Home if already logged in and try to visit /login", () => {
    (localStorage.getItem as Mock).mockReturnValue("fake-token");

    render(
    //   <MemoryRouter initialEntries={["/login"]}>
        <App />
    //   </MemoryRouter>
    );

    // Ensure it redirects to Home
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("should render Home when logged in", async () => {
    // Simulate authToken in localStorage (logged in state)
    (localStorage.getItem as Mock).mockReturnValue("fake-token");

    render(
    //   <MemoryRouter>
        <App />
    //   </MemoryRouter>
    );

    // Ensure Home component is rendered
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
