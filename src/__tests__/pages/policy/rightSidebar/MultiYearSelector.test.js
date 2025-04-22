import { render, screen, fireEvent } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";
import MultiYearSelector, {
  calculateDefaultSimLength,
  findLastSimYearFromMetadata,
  generateSimYearsMenuItems,
  validateSimYears,
} from "pages/policy/rightSidebar/MultiYearSelector";
import "@testing-library/jest-dom";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

// Mock useDisplayCategory
jest.mock("layout/Responsive", () => ({
  useDisplayCategory: () => "desktop",
}));

describe("MultiYearSelector", () => {
  const mockMetadata = {
    countryId: "us",
    economy_options: {
      time_period: [
        { name: 2020 },
        { name: 2021 },
        { name: 2022 },
        { name: 2023 },
        { name: 2024 },
      ],
    },
  };

  const mockStartYear = 2020;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    useSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
  });

  describe("Utility Functions", () => {
    test("findLastSimYearFromMetadata should return the last year from metadata", () => {
      // Given
      const metadata = mockMetadata;

      // When
      const result = findLastSimYearFromMetadata(metadata);

      // Then
      expect(result).toBe(2024);
    });

    test("calculateDefaultSimLength should return correct default length", () => {
      // Given
      const metadata = mockMetadata;
      const startYear = mockStartYear;

      // When
      const result = calculateDefaultSimLength(metadata, startYear);

      // Then
      expect(result).toBe(5); // Default for US is 10, but limited by available years
    });

    test("validateSimYears should validate year range correctly", () => {
      // Given
      const metadata = mockMetadata;
      const startYear = mockStartYear;

      // When/Then
      expect(validateSimYears("3", metadata, startYear)).toBe(true);
      expect(validateSimYears("0", metadata, startYear)).toBe(false);
      expect(validateSimYears("6", metadata, startYear)).toBe(false);
      expect(validateSimYears(null, metadata, startYear)).toBe(false);
    });

    test("generateSimYearsMenuItems should create correct menu items", () => {
      // Given
      const metadata = mockMetadata;
      const startYear = mockStartYear;

      // When
      const result = generateSimYearsMenuItems(metadata, startYear);

      // Then
      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({ label: 1, value: 1 });
      expect(result[4]).toEqual({ label: 5, value: 5 });
    });
  });

  describe("Component Behavior", () => {
    test("should initialize with default values when no simYears in URL", () => {
      // Given
      useSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);

      // When
      render(
        <MultiYearSelector metadata={mockMetadata} startYear={mockStartYear} />,
      );

      // Then
      expect(screen.getByRole("switch")).not.toBeChecked();
      // Ant Design Select component uses title attribute to display the value
      expect(screen.getByTitle("5")).toBeInTheDocument();
    });

    test("should initialize with URL parameters when simYears is present", () => {
      // Given
      useSearchParams.mockReturnValue([
        new URLSearchParams("simYears=3"),
        jest.fn(),
      ]);

      // When
      render(
        <MultiYearSelector metadata={mockMetadata} startYear={mockStartYear} />,
      );

      // Then
      expect(screen.getByRole("switch")).toBeChecked();
      expect(screen.getByTitle("3")).toBeInTheDocument();
    });

    test("should update URL when switch is toggled on", () => {
      // Given
      const setSearchParams = jest.fn();
      useSearchParams.mockReturnValue([new URLSearchParams(), setSearchParams]);

      // When
      render(
        <MultiYearSelector metadata={mockMetadata} startYear={mockStartYear} />,
      );
      fireEvent.click(screen.getByRole("switch"));

      // Then
      expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
      const searchParamsUpdate = setSearchParams.mock.calls[0][0](
        new URLSearchParams(),
      );
      expect(searchParamsUpdate.get("simYears")).toBe("5");
    });

    test("should update URL when years selection changes", () => {
      // Given
      const setSearchParams = jest.fn();
      useSearchParams.mockReturnValue([
        new URLSearchParams("simYears=3"),
        setSearchParams,
      ]);

      // When
      render(
        <MultiYearSelector metadata={mockMetadata} startYear={mockStartYear} />,
      );
      fireEvent.mouseDown(screen.getByRole("combobox"));
      fireEvent.click(screen.getByTitle("2"));

      // Then
      expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
      const searchParamsUpdate = setSearchParams.mock.calls[0][0](
        new URLSearchParams(),
      );
      expect(searchParamsUpdate.get("simYears")).toBe("2");
    });
  });
});
