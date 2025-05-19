import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as postsApi from "../services/postsApi";
import Posts from "./Posts";
import { vi } from "vitest";
import * as reactRedux from "react-redux";

// Mock useQuery from react-query
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

const mockPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  author: "Author",
  date: "2025-05-17",
  content: "Content",
  tags: [],
  image: "",
}));

describe("Posts component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(reactRedux, "useSelector").mockImplementation((selector) =>
      selector({ user: { numPage: 1 } })
    );
  });

  it("shows loader when loading", () => {
    const useQuery = require("@tanstack/react-query").useQuery;
    useQuery.mockReturnValue({ isLoading: true });

    renderWithProviders(<Posts />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when error occurs", () => {
    const useQuery = require("@tanstack/react-query").useQuery;
    useQuery.mockReturnValue({
      isError: true,
      error: { message: "Failed to fetch" },
    });

    renderWithProviders(<Posts />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders posts and pagination", () => {
    const useQuery = require("@tanstack/react-query").useQuery;
    useQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockPosts,
    });

    renderWithProviders(<Posts />);

    for (let i = 1; i <= 6; i++) {
      expect(screen.getByText(`Post ${i}`)).toBeInTheDocument();
    }

    expect(screen.getByText("1")).toBeInTheDocument(); // Pagination
  });
});
