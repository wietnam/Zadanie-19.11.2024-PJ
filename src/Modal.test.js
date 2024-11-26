import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders <Modal.Content> as null outside context", () => {
    render(<Modal.Content>Test Content</Modal.Content>);
    expect(screen.queryByText("Test Content")).toBeNull();
  });

  it("renders <Modal.Header> with a button and h3", () => {
    render(
      <Modal isOpen>
        <Modal.Header title="Test Header" />
      </Modal>
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Test Header" })).toBeInTheDocument();
  });

  it("renders <Modal.Footer> with two buttons", () => {
    render(
      <Modal isOpen>
        <Modal.Footer callToActionLabel="Confirm" />
      </Modal>
    );
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirm/i })).toBeInTheDocument();
  });

  it("closes modal on toggle() from any component", () => {
    render(
      <Modal isOpen>
        <Modal.Header title="Test Header" />
        <Modal.Content>Test Content</Modal.Content>
        <Modal.Footer callToActionLabel="Confirm" />
      </Modal>
    );

    // Modal is open
    expect(screen.getByText("Test Content")).toBeInTheDocument();

    // Close using header button
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("Test Content")).toBeNull();
  });
});
