import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { Input } from "../../../src/components/ui/input";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

describe("Input Component Suite", () => {
  it("renders the Input component", () => {
    const { unmount } = render(<Input data-testid="input-component" />);
    const input = screen.getByTestId("input-component");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
    );
    unmount();
  });

  it("applies the given className to the Input component", () => {
    const { unmount } = render(
      <Input className="custom-class" data-testid="input-component" />
    );
    const input = screen.getByTestId("input-component");
    expect(input).toHaveClass("custom-class");
    unmount();
  });

  it("forwards ref to the Input component", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input-component" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("accepts and displays value", () => {
    const { unmount } = render(
      <Input value="test value" data-testid="input-component" readOnly />
    );
    const input = screen.getByTestId("input-component");
    expect(input).toHaveValue("test value");
    unmount();
  });

  it("triggers the onChange event handler when value changes", () => {
    const handleChange = vi.fn();
    const { unmount } = render(
      <Input onChange={handleChange} data-testid="input-component" />
    );
    const input = screen.getByTestId("input-component");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    unmount();
  });

  it("renders with the correct type", () => {
    const { unmount } = render(
      <Input type="password" data-testid="input-component" />
    );
    const input = screen.getByTestId("input-component");
    expect(input).toHaveAttribute("type", "password");
    unmount();
  });

  it("is disabled when the disabled prop is set", () => {
    const { unmount } = render(
      <Input disabled data-testid="input-component" />
    );
    const input = screen.getByTestId("input-component");
    expect(input).toBeDisabled();
    unmount();
  });

  it("displays placeholder text correctly", () => {
    const { unmount } = render(
      <Input placeholder="Enter text here" data-testid="input-component" />
    );
    const input = screen.getByTestId("input-component");
    expect(input).toHaveAttribute("placeholder", "Enter text here");
    unmount();
  });
});
