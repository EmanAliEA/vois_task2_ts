import React from "react";
import { render, screen } from "@testing-library/react";
import PostHeader from "./PostHeader";
import * as postsApi from "../services/postsApi";

describe("PostHeader component", () => {
  it("renders author and formatted date", () => {
    // Mock the formatDate function
    vi.spyOn(postsApi, "formatDate").mockReturnValue("May 17, 2025");

    render(<PostHeader author="Jane Doe" date="2025-05-17" />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("May 17, 2025")).toBeInTheDocument();
  });
});
