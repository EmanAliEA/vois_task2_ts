import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  it("renders the loader icon", () => {
    render(<Loader />);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  it("has spinning animation and correct classes", () => {
    render(<Loader />);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("animate-spin", "text-white", "text-8xl");
  });
});
