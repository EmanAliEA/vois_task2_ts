import React from "react";
import { render, screen } from "@testing-library/react";
import TagItem from "./TagItem";

describe("TagItem component", () => {
  it("renders the tag text", () => {
    render(<TagItem text="react" />);
    expect(screen.getByText("react")).toBeInTheDocument();
  });
  it("has the correct styling classes", () => {
    render(<TagItem text="test" />);
    const tag = screen.getByText("test");
    expect(tag).toHaveClass("bg-white");
    expect(tag).toHaveClass("text-sky-500");
    expect(tag).toHaveClass("uppercase");
  });
});
