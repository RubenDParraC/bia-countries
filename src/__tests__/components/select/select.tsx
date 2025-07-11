import React from "react";

// External libraries
import { render, screen, fireEvent } from "@testing-library/react";

// Component under test
import Select from "../../../../components/select/select";

// Mock IconComponent to isolate test scope
jest.mock("../../../../components/icon-component/icon-component", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon" />,
}));

describe("Select", () => {
  const sampleData = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  // Test that the Select component renders with options and default "All"

  it("renders options including 'All'", () => {
    render(<Select data={sampleData} filter="" setFilter={() => {}} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // Check for default option and one region
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
  });

  // Test that the component calls setFilter when a new option is selected

  it("calls setFilter on change", () => {
    const handleChange = jest.fn();

    render(<Select data={sampleData} filter="" setFilter={handleChange} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Asia" } });

    expect(handleChange).toHaveBeenCalledWith("Asia");
  });

  // Test that custom className is applied

  it("applies custom className to select", () => {
    render(
      <Select
        data={sampleData}
        filter=""
        setFilter={() => {}}
        className="bg-yellow-50"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select.className).toMatch(/bg-yellow-50/);
  });

  // Test that icon is rendered

  it("renders ChevronDownIcon", () => {
    render(<Select data={sampleData} filter="" setFilter={() => {}} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
