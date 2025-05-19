import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm component", () => {
  it("renders children inside the form", () => {
    render(
      <LoginForm isLoginForm={true} onSubmit={() => {}}>
        <p>Test Child</p>
      </LoginForm>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies correct padding when isLoginForm is true", () => {
    const { container } = render(
      <LoginForm isLoginForm={true} onSubmit={() => {}}>
        <p>Padding Test</p>
      </LoginForm>
    );
    const form = container.querySelector("form");
    expect(form).toHaveClass("lg:py-10");
  });

  it("applies correct padding when isLoginForm is false", () => {
    const { container } = render(
      <LoginForm isLoginForm={false} onSubmit={() => {}}>
        <p>Padding Test</p>
      </LoginForm>
    );
    const form = container.querySelector("form");
    expect(form).toHaveClass("lg:py-28");
    expect(form).toHaveClass("mt-5");
  });

  it("calls onSubmit handler when form is submitted", () => {
    const handleSubmit = vi.fn((e: Event) => e.preventDefault());
    render(
      <LoginForm isLoginForm={true} onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </LoginForm>
    );
    fireEvent.click(screen.getByText("Submit"));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
