import { vi } from "vitest";
import {
  fetchPosts,
  addPostApi,
  getPost,
  updatePost,
  deletePost,
  Post,
} from "./postsApi";

global.fetch = vi.fn();

const mockPost: Post = {
  id: 1,
  title: "Test Title",
  content: "Test Content",
  author: "Test Author",
};

describe("postsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchPosts returns posts", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ events: [mockPost] }),
    });

    const posts = await fetchPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("Test Title");
  });

  it("fetchPosts handles error", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const posts = await fetchPosts();
    expect(posts).toEqual([]);
  });

  it("addPostApi adds a post", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost,
    });

    const result = await addPostApi(mockPost);
    expect(result.title).toBe("Test Title");
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("getPost fetches a post by ID", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ event: mockPost }),
    });

    const result = await getPost(1);
    expect(result.id).toBe(1);
  });

  it("updatePost updates a post", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ event: mockPost }),
    });

    const result = await updatePost({ ...mockPost, id: 1 });
    expect(result.title).toBe("Test Title");
  });

  it("deletePost deletes a post", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
    });

    await expect(deletePost(1)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), {
      method: "DELETE",
    });
  });
});
