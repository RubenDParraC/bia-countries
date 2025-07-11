import React from "react";

// External libraries
import * as mockedSWR from "swr";
import { render, screen, waitFor } from "@testing-library/react";

// Page under test
import HomePage from "@/app/page";

// App context
import { ThemeProvider } from "../../../context/context";

// Mocked countries response for useSWR
const mockCountries = [
  {
    name: { common: "Colombia" },
    capital: ["Bogotá"],
    region: "Americas",
    flags: { svg: "https://flagcdn.com/co.svg" },
    population: 50882884,
    cca3: "COL",
  },
  {
    name: { common: "France" },
    capital: ["Paris"],
    region: "Europe",
    flags: { svg: "https://flagcdn.com/fr.svg" },
    population: 67081000,
    cca3: "FRA",
  },
];

// Helper function to render the component within the ThemeProvider to simulate the real application context (dark/light mode support).
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Fully mock useSWR to control return values during tests
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("HomePage", () => {
  // Set up a successful response with mockCountries before each test
  beforeEach(() => {
    (mockedSWR.default as jest.Mock).mockReturnValue({
      data: mockCountries,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
    });
  });

  // Test that HomePage renders the expected country names when data is available

  it("renders without crashing", async () => {
    renderWithTheme(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText("Colombia")).toBeInTheDocument();
      expect(screen.getByText("France")).toBeInTheDocument();
    });
  });

  // Test that HomePage displays a loading message when data is still being fetched

  it("renders loading state", () => {
    (mockedSWR.default as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    });

    renderWithTheme(<HomePage />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  // Test that HomePage displays an error message when there is a fetch error

  it("renders error state", () => {
    (mockedSWR.default as jest.Mock).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
    });

    renderWithTheme(<HomePage />);
    expect(screen.getByText("Error cargando países")).toBeInTheDocument();
  });
});
