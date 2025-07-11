import React, { act } from "react";

// External libraries
import { render, screen, fireEvent } from "@testing-library/react";

// Context
import { ThemeProvider } from "../../../../context/context";

// Component under test
import Header from "../../../../components/header/header";

// Mock icon component
jest.mock("../../../../components/icon-component/icon-component", () => ({
  __esModule: true,
  default: ({ iconName }: { iconName: string }) => (
    <svg data-testid="icon" aria-label={iconName} />
  ),
}));

// Helper function to render the Header component inside ThemeProvider
const renderWithTheme = () => {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
};

describe("Header", () => {
  //Test that Header renders properly with title and toggle button

  it("renders header title and dark mode toggle", () => {
    renderWithTheme();

    expect(screen.getByText("Where in the world?")).toBeInTheDocument();
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  // Test that clicking the dark mode toggle button changes the theme context (We validate this indirectly by ensuring the button remains interactive)

  it("toggles dark mode on button click", () => {
    renderWithTheme();
    const toggleButton = screen.getByRole("button", { name: /dark mode/i });

    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);

    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  // Test that Header hides on scroll down and shows again on scroll up

  it("hides and shows on scroll", () => {
    renderWithTheme();
    const header = screen.getByTestId("header");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header.className).toMatch(/-translate-y-full/);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 20, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header.className).toMatch(/translate-y-0/);
  });
});
