import React from "react";

// Navigation hooks
import { useParams } from "next/navigation";

// External libraries
import * as mockedSWR from "swr";
import { render, screen, waitFor } from "@testing-library/react";

// Page under test
import CountryDetail from "@/app/country/[code]/page";

// App context
import { ThemeProvider } from "../../../../../context/context";

// Fully mock useRouter and useParams from Next.js
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

// Fully mock SWR to control return values
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mocked country detail response
const mockCountry = {
  name: {
    common: "Colombia",
    official: "Republic of Colombia",
  },
  capital: ["Bogotá"],
  region: "Americas",
  subregion: "South America",
  flags: { svg: "https://flagcdn.com/co.svg" },
  population: 50882884,
  tld: [".co"],
  currencies: {
    COP: {
      name: "Colombian peso",
      symbol: "$",
    },
  },
  languages: {
    spa: "Spanish",
  },
  borders: ["BRA", "PER"],
  cca3: "COL",
};

// Mocked response for border countries
const mockBorders = [
  {
    name: { common: "Brazil" },
    cca3: "BRA",
  },
  {
    name: { common: "Peru" },
    cca3: "PER",
  },
];

// Helper function to render CountryDetail page within ThemeProvider to simulate real-world usage (including theme context like dark/light mode).

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("CountryDetail", () => {
  // Before each test, we mock:
  // - useParams to simulate route parameter `code = COL`
  // - useSWR to return either the country or borderCountries mock data

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ code: "COL" });

    (mockedSWR.default as jest.Mock).mockImplementation((url: string) => {
      if (url?.includes("v3.1/alpha/COL")) {
        return {
          data: mockCountry,
          error: undefined,
          isLoading: false,
          isValidating: false,
          mutate: jest.fn(),
        };
      }

      if (url?.includes("v3.1/alpha?codes=")) {
        return {
          data: mockBorders,
          error: undefined,
          isLoading: false,
          isValidating: false,
          mutate: jest.fn(),
        };
      }

      return {
        data: undefined,
        error: undefined,
        isLoading: false,
        isValidating: false,
        mutate: jest.fn(),
      };
    });
  });

  // Test: Renders full country details and borders when data is available.

  it("renders country details", async () => {
    renderWithTheme(<CountryDetail />);

    await waitFor(() => {
      expect(screen.getByText("Colombia")).toBeInTheDocument();
      expect(screen.getByText("Republic of Colombia")).toBeInTheDocument();
      expect(screen.getByText("Bogotá")).toBeInTheDocument();
      expect(screen.getByText("Americas")).toBeInTheDocument();
      expect(screen.getByText("South America")).toBeInTheDocument();
      expect(screen.getByText("Colombian peso ($)")).toBeInTheDocument();
      expect(screen.getByText("Spanish")).toBeInTheDocument();
      expect(screen.getByText("Brazil")).toBeInTheDocument();
      expect(screen.getByText("Peru")).toBeInTheDocument();
    });
  });

  // Test: Displays loading UI when country data is not yet available.

  it("shows loading state", () => {
    (mockedSWR.default as jest.Mock).mockReturnValueOnce({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: jest.fn(),
    });

    renderWithTheme(<CountryDetail />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  // Test: Displays error UI if data fetching fails.

  it("shows error state", () => {
    (mockedSWR.default as jest.Mock).mockReturnValueOnce({
      data: undefined,
      error: true,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
    });

    renderWithTheme(<CountryDetail />);
    expect(
      screen.getByText("Error cargando detalles del país")
    ).toBeInTheDocument();
  });
});
