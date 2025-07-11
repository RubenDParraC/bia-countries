import React from "react";

// External libraries
import { render, screen } from "@testing-library/react";

// Component under test
import Tag from "../../../../components/tag/tag";

describe("Tag", () => {
  // Test that Tag renders the provided label text

  it("renders the tag label", () => {
    render(<Tag label="Border A" />);

    expect(screen.getByText("Border A")).toBeInTheDocument();
  });

  // Test that Tag applies custom className when provided

  it("applies custom className", () => {
    render(<Tag label="Test" className="bg-blue-500" />);

    const tag = screen.getByText("Test").parentElement;
    expect(tag?.className).toMatch(/bg-blue-500/);
  });

  // Test that Tag includes base styles

  it("has base styles applied by default", () => {
    render(<Tag label="BaseStyleTag" />);

    const tag = screen.getByText("BaseStyleTag").parentElement;
    expect(tag?.className).toMatch(/rounded/);
    expect(tag?.className).toMatch(/shadow/);
  });
});
