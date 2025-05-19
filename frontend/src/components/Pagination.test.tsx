import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import configureStore from "redux-mock-store";
import Pagination from "./Pagination";
import { changePage } from "../features/userSlice";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (fn: any) => fn({ user: { numPage: 1 } }),
  };
});

describe("Pagination component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders correct number of page buttons", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: new Array(12).fill({}), // 12 posts = 2 pages
    });

    const store = mockStore({ user: { numPage: 1 } });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("1");
    expect(buttons[1]).toHaveTextContent("2");
  });

  it("dispatches changePage when a button is clicked", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: new Array(12).fill({}),
    });

    const store = mockStore({ user: { numPage: 1 } });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const secondButton = screen.getByText("2");
    fireEvent.click(secondButton);

    expect(mockDispatch).toHaveBeenCalledWith(changePage(1)); // index 1 = page 2
  });
});
