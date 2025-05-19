import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserInfo from "./UserInfo";
import type { User } from "../services/checkUser";

const mockStore = configureStore([]);

describe("UserInfo Component", () => {
  it("renders 'No user information available.' when user is null", () => {
    const store = mockStore({
      user: { user: null },
    });

    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );

    expect(
      screen.getByText("No user information available.")
    ).toBeInTheDocument();
  });

  it("renders user information when user is present", () => {
    const mockUser: User = {
      name: "John Doe",
      email: "john@example.com",
      job: "Developer",
      location: "Cairo",
      about: "Passionate developer.",
    };

    const store = mockStore({
      user: { user: mockUser },
    });

    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Name: John Doe"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Location: Cairo"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Designation: Developer"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Email: john@example.com"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Passionate developer."
      )
    ).toBeInTheDocument();
    const bioTextarea = screen.getByTitle("User Bio") as HTMLTextAreaElement;
    expect(bioTextarea.defaultValue).toBe("Passionate developer.");
  });

  it("renders default values when user fields are missing", () => {
    const mockUser: User = {
      name: "",
      email: "",
      job: "",
      location: "",
      about: "",
    };

    const store = mockStore({
      user: { user: mockUser },
    });

    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );

    // Use custom matcher to match full text content
    expect(
      screen.getByText((_, element) => element?.textContent === "Name: ")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) => element?.textContent === "Email: ")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Designation: _"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) => element?.textContent === "Location: _")
    ).toBeInTheDocument();

    // Check the textarea's default value
    const bioTextarea = screen.getByTitle("User Bio") as HTMLTextAreaElement;
    expect(bioTextarea.defaultValue).toBe("_");
  });
});
