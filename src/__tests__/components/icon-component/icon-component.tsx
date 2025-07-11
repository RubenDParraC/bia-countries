import React from "react";

// External libraries
import { render, screen, fireEvent } from "@testing-library/react";

// Component under test
import IconComponent from "../../../../components/icon-component/icon-component";

// Define a sample icon name that exists in @heroicons/react
const sampleIcon = "MoonIcon";

// Test suite for IconComponent

describe("IconComponent", () => {
  // Test that the icon renders correctly with default size and outline variant

  it("renders an icon with default props", () => {
    render(<IconComponent iconName={sampleIcon} />);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({ width: "24px", height: "24px" });
  });

  // Test that icon uses solid variant when specified

  it("renders a solid icon variant", () => {
    render(<IconComponent iconName={sampleIcon} variant="solid" />);
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  // Test that custom size and className are applied correctly

  it("applies custom size and className", () => {
    render(
      <IconComponent iconName={sampleIcon} size={32} className="text-red-500" />
    );
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveStyle({ width: "32px", height: "32px" });
    expect(icon).toHaveClass("text-red-500");
  });

  // Test that onClick is triggered when the icon is clicked

  it("triggers onClick when icon is clicked", () => {
    const handleClick = jest.fn();

    render(
      <IconComponent
        iconName={sampleIcon}
        onClick={handleClick}
        className="clickable"
      />
    );

    const icon = screen.getByRole("img", { hidden: true });
    fireEvent.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test fallback behavior when icon name is invalid

  it("renders fallback text when icon is not found", () => {
    render(<IconComponent iconName={"InvalidIcon" as any} />);
    expect(screen.getByText("Icon not found!")).toBeInTheDocument();
  });
});
