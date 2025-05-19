import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostItem from "./PostItem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as postsApi from "../services/postsApi";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock the deletePost function
vi.mock("../services/postsApi", async () => {
  const actual = await vi.importActual("../services/postsApi");
  return {
    ...actual,
    deletePost: vi.fn(),
  };
});

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

const mockPost = {
  id: 1,
  title: "Test Post",
  author: "John Doe",
  date: "2025-05-17",
  content: "This is a test post.",
  tags: ["react", "test"],
  image: "https://example.com/image.jpg",
};

describe("PostItem component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders post content correctly", () => {
    renderWithClient(<PostItem post={mockPost} />);

    expect(
      screen.getByRole("heading", { name: /test post/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/this is a test post/i)).toBeInTheDocument();

    mockPost.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    expect(screen.getByAltText(mockPost.title)).toHaveAttribute(
      "src",
      mockPost.image
    );
  });

  it("calls deletePost when confirmed", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
    const mockDelete = postsApi.deletePost as vi.Mock;

    renderWithClient(<PostItem post={mockPost} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith(1);
    });
  });

  it("does not call deletePost when cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const mockDelete = postsApi.deletePost as vi.Mock;

    renderWithClient(<PostItem post={mockPost} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockDelete).not.toHaveBeenCalled();
  });
});
