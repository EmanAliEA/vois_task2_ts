import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostForm from "./PostForm";

describe("PostForm component", () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

  it("renders all input fields", () => {
    renderWithRouter(<PostForm submitFn={() => {}} />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Author")).toBeInTheDocument();
    expect(screen.getByLabelText("Image")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Tags")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Content")).toBeInTheDocument();
  });

  it("renders with default post values", () => {
    const post = {
      id: 200,
      title: "Test Title",
      author: "Test Author",
      image: "image.jpg",
      date: "2025-05-17",
      tags: ["react", "test"],
      content: "Test content",
    };

    renderWithRouter(
      <PostForm submitFn={mockSubmit} post={post} edit={true} />
    );

    expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Author")).toBeInTheDocument();
    expect(screen.getByDisplayValue("image.jpg")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-05-17")).toBeInTheDocument();
    expect(screen.getByDisplayValue("react,test")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test content")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("submits form with correct data", () => {
    renderWithRouter(<PostForm submitFn={mockSubmit} />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Post" },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: "Author Name" },
    });
    fireEvent.change(screen.getByLabelText("Tags"), {
      target: { value: "tag1, tag2" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "" }, // or a specific date if you want
    });
    fireEvent.change(screen.getByLabelText("Image"), {
      target: { value: "" }, // or a specific date if you want
    });
    fireEvent.change(screen.getByPlaceholderText("Content"), {
      target: { value: "Post content" },
    });

    // fireEvent.click(screen.getByText("Add Post"));
    fireEvent.submit(screen.getByText("Add Post").closest("form")!);

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Post",
        author: "Author Name",
        tags: ["tag1", "tag2"],
        content: "Post content",
        image: "",
        date: "",
      })
    );
  });
});
