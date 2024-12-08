import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, Mock } from "vitest";
import DeleteGroup from "../../src/components/DeleteGroup";
import "@testing-library/jest-dom/vitest";
import * as api from "../../src/api";

vi.mock("../../src/api", () => ({
  getGroupsAndPermissions: vi.fn(),
  deleteGroup: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("DeleteGroup Component Suite", () => {
    it("renders a delete button for every group", () => {
        (api.getGroupsAndPermissions as Mock).mockResolvedValueOnce({
            groups: [
                { id: 1, name: "Group 1" },
                { id: 2, name: "Group 2" },
                { id: 3, name: "Group 3" }
            ]
        });
        
        const { unmount } = render(<DeleteGroup ariaLabel="testLabel" />);
        
        // Wait for groups to be displayed
        waitFor(() => {
            const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
            
            // Check if the number of delete buttons matches the number of groups
            expect(deleteButtons.length).toBe(3);
        });

        unmount();
});

it("calls deleteGroup and removes the group from the list", async () => {
  (api.getGroupsAndPermissions as Mock).mockResolvedValueOnce({
    groups: [
      { id: 1, name: "Group 1" },
      { id: 2, name: "Group 2" },
    ],
  });
  (api.deleteGroup as Mock).mockResolvedValueOnce({});

  const { unmount, container } = render(<DeleteGroup ariaLabel="testLabel"/>);

  // Wait for the groups to be rendered
  await waitFor(() => expect(screen.getByText("Group 1")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Group 2")).toBeInTheDocument());

  // Select the delete button for Group 1 by name attribute
  const deleteButtonGroup1 = container.querySelector('button[name="button-1"]');
  if (deleteButtonGroup1) {
    fireEvent.click(deleteButtonGroup1);
  }

  // Ensure deleteGroup was called with the correct ID (1)
  await waitFor(() => {
    expect(api.deleteGroup).toHaveBeenCalledWith(1);
  });

  // Ensure the deleted group (Group 1) is removed from the list
  expect(screen.queryByText("Group 1")).toBeNull();

  // Ensure Group 2 is still in the list
  expect(screen.getByText("Group 2")).toBeInTheDocument();

  unmount();
});



  it("displays 'No groups found' when there are no groups", async () => {
    (api.getGroupsAndPermissions as Mock).mockResolvedValueOnce({ groups: [] });
    const { unmount } = render(<DeleteGroup ariaLabel="testLabel"/>);
    
    await screen.findByText("No groups found");
    
    expect(screen.getByText("No groups found")).toBeInTheDocument();
    
    unmount();
  });
});
