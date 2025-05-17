import { QueryClient } from "@tanstack/react-query";

const URL = "http://localhost:3000/events"; // Updated to use json-server's local endpoint
export const queryClient = new QueryClient();

export type Post = {
  id?: number;
  title: string;
  content: string;
  image?: string;
  date?: string;
  tags?: string[];
  author: string;
};

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch posts data");
    const data: { events: Post[] } = await response.json();
    return (data.events || []).map((post) => ({
      ...post,
      id: post.id,
      tags: post.tags || [],
      author: post.author || "Unknown",
      date: post.date || new Date().toISOString(),
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function addPostApi(post: Post): Promise<Post> {
  try {
    console.log(post);
    if (!post.image)
      post.image =
        "https://th.bing.com/th/id/R.dfc784e9c41f4a1c3953e9466e470c0a?rik=SokVn3DFoqU%2fgw&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f47%2f28%2fMGoFVr.jpg&ehk=YZtbP%2fDiMcGFlxC4h02p24rhs4qMFnnZPt%2fYkR4GJAw%3d&risl=&pid=ImgRaw&r=0";
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({ event: post }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add new post");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in addPostApi:", error.message);
    }
    throw error;
  }
}

export function formatDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toDateString().slice(4);
}

export async function getPost(id: number): Promise<Post> {
  try {
    console.log(id, typeof id);
    const response = await fetch(`${URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch post data");
    }
    const data = await response.json();
    console.log("get post", data);
    return data.event;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getPost:", error.message);
    }
    throw error;
  }
}

export async function updatePost({
  id,
  ...post
}: Post & { id: number }): Promise<Post> {
  console.log("update function ");
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: post }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update post");
    }
    const data = await response.json();
    return data.event;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in updatePost:", error.message);
    }
    throw error;
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    console.log(id);
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete post");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in deletePost:", error.message);
    }
    throw error;
  }
}
