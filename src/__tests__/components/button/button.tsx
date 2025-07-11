import React from "react";

// External libraries
import { render, screen, fireEvent } from "@testing-library/react";

// components
import Button from "../../../../components/button/button";

// Dummy icon component for testing purposes
const DummyIcon = () => <svg data-testid="icon" />;

describe("Button", () => {
  // Test that the button renders the given label and optional icons

  it("renders label and optional icons", () => {
    render(
      <Button
        label="Click Me"
        onClick={() => {}}
        iconLeft={<DummyIcon />}
        iconRight={<DummyIcon />}
      />
    );

    // Check label is present
    expect(screen.getByText("Click Me")).toBeInTheDocument();

    // Check both icons render
    const icons = screen.getAllByTestId("icon");
    expect(icons).toHaveLength(2);
  });

  // Test that clicking the button triggers the provided onClick handler

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(<Button label="Press" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /press/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test that custom className is merged properly

  it("applies additional className via props", () => {
    render(<Button label="Styled" onClick={() => {}} className="bg-red-500" />);
    const button = screen.getByRole("button", { name: /styled/i });

    expect(button).toHaveClass("bg-red-500");
  });
});
