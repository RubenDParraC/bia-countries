import React from "react";

// External libraries
import { render, screen } from "@testing-library/react";

// Context
import { ThemeProvider } from "../../../../context/context";

// Component under test
import CountryCard from "../../../../components/country-card/country-card";

// Mock Next.js Link behavior to avoid errors during test
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

// Mock router (even if not used directly, avoids potential warnings)
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Sample country data for testing (must match the Country type)
const mockCountry = {
  name: {
    common: "Canada",
    official: "Canada",
  },
  capital: ["Ottawa"],
  region: "Americas",
  population: 38008005,
  flags: {
    svg: "https://flagcdn.com/ca.svg",
    png: "https://flagcdn.com/w320/ca.png",
    alt: "Flag of Canada",
  },
  cca3: "CAN",
};

// Helper function to render the component inside ThemeProvider to simulate the dark/light mode environment.

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("CountryCard", () => {
  // Test that the component displays correct country information

  it("renders country details", () => {
    renderWithTheme(<CountryCard country={mockCountry} darkMode={false} />);

    // Check for static text content
    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.getByText("Population:")).toBeInTheDocument();
    expect(screen.getByText(/38[.,]008[.,]005/)).toBeInTheDocument();
    expect(screen.getByText("Region:")).toBeInTheDocument();
    expect(screen.getByText("Americas")).toBeInTheDocument();
    expect(screen.getByText("Capital:")).toBeInTheDocument();
    expect(screen.getByText("Ottawa")).toBeInTheDocument();
  });

  // Test that the darkMode class styles are applied when enabled

  it("applies dark mode styles", () => {
    const { container } = renderWithTheme(
      <CountryCard country={mockCountry} darkMode={true} />
    );

    const card = container.firstChild;
    expect(card).toHaveClass("bg-gray-800");
    expect(card).toHaveClass("text-gray-100");
  });

  // Test that the country flag is rendered correctly with correct attributes

  it("renders country flag image", () => {
    renderWithTheme(<CountryCard country={mockCountry} darkMode={false} />);

    // Use getByAltText since we mocked next/image to a real <img>
    const image = screen.getByAltText("Canada");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://flagcdn.com/ca.svg");
  });
});
