import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "../pages/Dashboard";
import * as postsApi from "../services/postsApi";

// Mock the fetchPosts function
vi.mock("../services/postsApi");

const mockPosts = [
  { id: 1, title: "Post 1", body: "Body 1", userId: 1 },
  { id: 2, title: "Post 2", body: "Body 2", userId: 2 },
];

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Dashboard", () => {
  it("renders loader while loading", async () => {
    (postsApi.fetchPosts as vi.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    renderWithProviders(<Dashboard />);
    expect(screen.getByRole("status")).toBeInTheDocument(); // Assuming Loader uses role="status"
  });

  // it("renders error message on error", async () => {
  //   (postsApi.fetchPosts as vi.Mock).mockRejectedValue(
  //     new Error("Failed to fetch")
  //   );
  //   renderWithProviders(<Dashboard />);
  //   await waitFor(() => {
  //     expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  //   });
  // });

  // it("renders posts when data is fetched", async () => {
  //   (postsApi.fetchPosts as vi.Mock).mockResolvedValue(mockPosts);
  //   renderWithProviders(<Dashboard />);
  //   await waitFor(() => {
  //     expect(screen.getByText("Post 1")).toBeInTheDocument();
  //     expect(screen.getByText("Post 2")).toBeInTheDocument();
  //   });
  // });

  // it("has a link to create a new post", () => {
  //   renderWithProviders(<Dashboard />);
  //   const link = screen.getByRole("link", { name: /new post/i });
  //   expect(link).toHaveAttribute("href", "/newPost");
  // });
});
