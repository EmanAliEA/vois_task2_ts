import React from "react";
import { render, screen } from "@testing-library/react";
import Modal from "./Modal";

// Set up a modal root in the document body before tests run
beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
});

describe("Modal component", () => {
  it("renders children inside the portal", () => {
    render(
      <Modal>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render if #modal root is missing", () => {
    // Remove the modal root temporarily
    const modalRoot = document.getElementById("modal");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { container } = render(
      <Modal>
        <p>Should not render</p>
      </Modal>
    );

    expect(container.firstChild).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Modal root element not found"
    );

    // Restore modal root
    document.body.appendChild(modalRoot!);
    consoleErrorSpy.mockRestore();
  });
});
