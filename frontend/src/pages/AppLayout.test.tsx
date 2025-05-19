import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

const mockStore = configureStore([]);

const renderWithProviders = (ui: React.ReactElement, storeState: any) => {
  const store = mockStore(storeState);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={ui}>
            <Route index element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("AppLayout", () => {
  // this is failed because not allowed login when user isn't logged
  it("renders Login when user is not logged in", () => {
    renderWithProviders(<AppLayout />, { user: { isLogin: false } });

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("renders Outlet when user is logged in", () => {
    renderWithProviders(<AppLayout />, { user: { isLogin: true } });

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
