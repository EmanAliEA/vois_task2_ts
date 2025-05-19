import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import * as checkUserModule from "../services/checkUser";

import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginForm from "../components/LoginForm";

const mockStore = configureStore([]);
const store = mockStore({});

// Mock hooks
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// describe("Login Component", () => {
//   const mockDispatch = vi.fn();
//   const mockNavigate = vi.fn();

//   beforeEach(() => {
//     vi.clearAllMocks();
//     (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
//     (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
//   });

//   it("renders login form by default", () => {
//     render(<Login />);
//     expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

//     expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
//   });

//   it("switches to signup form when 'Signup' is clicked", () => {
//     render(<Login />);
//     fireEvent.click(screen.getByText(/signup/i));
//     expect(
//       screen.getByRole("heading", { name: /signup/i })
//     ).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/job/i)).toBeInTheDocument();
//   });

//   it("shows error when checkUser returns false", async () => {
//     vi.spyOn(checkUserModule, "checkUser").mockReturnValue(false);

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Login />
//         </MemoryRouter>
//       </Provider>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/email/i), {
//       target: { value: "test@example.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/password/i), {
//       target: { value: "123456" },
//     });

//     fireEvent.submit(screen.getByTestId("login-form"));

//     await waitFor(() => {
//       expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
//     });
//   });

//   it("dispatches login and navigates on successful login", () => {
//     const mockUser = {
//       email: "test@example.com",
//       name: "Test",
//       password: "123456",
//       location: "Cairo",
//       job: "Dev",
//       about: "",
//       isLoginForm: true,
//     };

//     vi.spyOn(checkUserModule, "checkUser").mockReturnValue({ user: mockUser });

//     render(<Login />);
//     fireEvent.change(screen.getByPlaceholderText(/email/i), {
//       target: { value: "test@example.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/password/i), {
//       target: { value: "123456" },
//     });

//     fireEvent.submit(screen.getByTestId("login-form"));

//     expect(mockDispatch).toHaveBeenCalledWith({
//       type: "user/login",
//       payload: mockUser,
//     });
//     expect(mockNavigate).toHaveBeenCalledWith("/");
//   });
// });

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

describe("Login Component", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
  });

  it("renders login form by default", () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("switches to signup form when 'Signup' is clicked", () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByText(/signup/i));
    expect(
      screen.getByRole("heading", { name: /signup/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/job/i)).toBeInTheDocument();
  });

  // it("shows error when checkUser returns false", async () => {
  //   vi.spyOn(checkUserModule, "checkUser").mockResolvedValue(false);

  //   renderWithProviders(<Login />);
  //   fireEvent.change(screen.getByPlaceholderText(/email/i), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText(/password/i), {
  //     target: { value: "123456" },
  //   });

  //   fireEvent.submit(screen.getByTestId("login-form"));

  //   await screen.findByText(/an unexpected error occurred/i);
  // });

  // it("dispatches login and navigates on successful login", async () => {
  //   const mockUser = {
  //     email: "test@example.com",
  //     name: "Test",
  //     password: "123456",
  //     location: "Cairo",
  //     job: "Dev",
  //     about: "",
  //   };

  //   vi.spyOn(checkUserModule, "checkUser").mockResolvedValue({
  //     user: mockUser,
  //   });

  //   renderWithProviders(<Login />);
  //   fireEvent.change(screen.getByPlaceholderText(/email/i), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText(/password/i), {
  //     target: { value: "123456" },
  //   });

  //   fireEvent.submit(screen.getByTestId("login-form"));

  //   await waitFor(() => {
  //     expect(mockDispatch).toHaveBeenCalledWith({
  //       type: "user/login",
  //       payload: mockUser,
  //     });
  //     expect(mockNavigate).toHaveBeenCalledWith("/");
  //   });
  // });
});
