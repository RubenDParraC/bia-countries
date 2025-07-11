import React from "react";

// External libraries
import { render, screen, fireEvent } from "@testing-library/react";

// Component under test
import Input from "../../../../components/input/input";

// Mock icon component to isolate Input behavior
jest.mock("../../../../components/icon-component/icon-component", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon" />,
}));

describe("Input", () => {
  // Test that Input renders with the correct placeholder and icon

  it("renders input with placeholder and icon", () => {
    render(
      <Input
        placeholder="Search country"
        searchTerm=""
        setSearchTerm={() => {}}
      />
    );

    // Check placeholder is rendered
    const input = screen.getByPlaceholderText("Search country");
    expect(input).toBeInTheDocument();

    // Check icon is present
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  // Test that Input updates value on user input

  it("calls setSearchTerm on input change", () => {
    const handleChange = jest.fn();

    render(
      <Input
        placeholder="Type here"
        searchTerm=""
        setSearchTerm={handleChange}
      />
    );

    const input = screen.getByPlaceholderText("Type here");
    fireEvent.change(input, { target: { value: "Colombia" } });

    expect(handleChange).toHaveBeenCalledWith("Colombia");
  });

  // Test that custom className is applied to container

  it("applies custom className to wrapper", () => {
    render(
      <Input
        placeholder="Custom"
        searchTerm=""
        setSearchTerm={() => {}}
        className="bg-blue-100"
      />
    );

    const wrapper = screen.getByPlaceholderText("Custom").parentElement;
    expect(wrapper).toHaveClass("bg-blue-100");
  });
});
