import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders label when 'isLoginForm' is true", () => {
    render(
      <Input name="email" isLoginForm>
        Email
      </Input>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders span when 'check' is false", () => {
    render(<Input name="username">Username</Input>);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("applies custom style class", () => {
    render(
      <Input name="custom" customStyle="bg-red-100">
        Custom
      </Input>
    );
    const wrapper = screen.getByText("Custom").parentElement;
    expect(wrapper).toHaveClass("bg-red-100");
  });

  it("renders input with correct type", () => {
    render(
      <Input name="password" type="password" isLoginForm>
        Password
      </Input>
    );
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input.type).toBe("password");
  });

  it("calls onChange handler when typing", () => {
    const handleChange = vi.fn();
    render(
      <Input name="name" onChange={handleChange} isLoginForm>
        Name
      </Input>
    );
    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
