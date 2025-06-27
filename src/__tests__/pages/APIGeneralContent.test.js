import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  VariableParameterExplorer,
  APIResultCard,
} from "../../pages/learn/APIGeneralContent";

// Mock the antd components
jest.mock("antd", () => ({
  Card: ({ children, onClick, ...props }) => (
    <div data-testid="card" onClick={onClick} {...props}>
      {children}
    </div>
  ),
  Tag: ({ children, color, ...props }) => (
    <span data-testid="tag" data-color={color} {...props}>
      {children}
    </span>
  ),
  Tooltip: ({ children, title }) => (
    <div data-testid="tooltip" title={title}>
      {children}
    </div>
  ),
}));

// Mock the icons
jest.mock("@ant-design/icons", () => ({
  QuestionCircleOutlined: () => <span data-testid="question-icon" />,
}));

// Mock the style object
jest.mock("../../style", () => ({
  colors: {
    DARK_GRAY: "#666666",
  },
}));

describe("APIResultCard", () => {
  const mockSetSelectedCard = jest.fn();

  const mockParameterMetadata = {
    label: "Test Parameter",
    parameter: "gov.test.parameter",
  };

  const mockVariableMetadata = {
    label: "Test Variable",
    name: "test_variable",
  };

  beforeEach(() => {
    mockSetSelectedCard.mockClear();
  });

  it("renders parameter card when type is parameter", () => {
    render(
      <APIResultCard
        metadata={mockParameterMetadata}
        type="parameter"
        setSelectedCard={mockSetSelectedCard}
      />,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Parameter")).toBeInTheDocument();
    expect(screen.getByText("Test Parameter")).toBeInTheDocument();
  });

  it("renders variable card when type is variable", () => {
    render(
      <APIResultCard
        metadata={mockVariableMetadata}
        type="variable"
        setSelectedCard={mockSetSelectedCard}
      />,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Variable")).toBeInTheDocument();
    expect(screen.getByText("Test Variable")).toBeInTheDocument();
  });

  it("calls setSelectedCard with correct data when clicked", () => {
    render(
      <APIResultCard
        metadata={mockParameterMetadata}
        type="parameter"
        setSelectedCard={mockSetSelectedCard}
      />,
    );

    fireEvent.click(screen.getByTestId("card"));

    expect(mockSetSelectedCard).toHaveBeenCalledWith({
      ...mockParameterMetadata,
      type: "parameter",
    });
  });

  it("has correct card styling attributes", () => {
    render(
      <APIResultCard
        metadata={mockParameterMetadata}
        type="parameter"
        setSelectedCard={mockSetSelectedCard}
      />,
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveStyle({
      width: "100%",
      backgroundColor: "white",
      cursor: "pointer",
    });
  });
});

describe("VariableParameterExplorer", () => {
  const mockMetadata = {
    parameters: {
      param1: {
        type: "parameter",
        label: "Parameter One",
        parameter: "gov.param.one",
        description: "First parameter",
      },
      param2: {
        type: "parameter",
        label: "Parameter Two",
        parameter: "gov.abolitions.param.two",
        description: "Abolition parameter",
      },
    },
    variables: {
      var1: {
        name: "variable_one",
        label: "Variable One",
        description: "First variable",
      },
      var2: {
        name: "variable_two",
        label: "Variable Two",
        description: "Second variable",
      },
    },
  };

  it("renders search input and cards", () => {
    render(<VariableParameterExplorer metadata={mockMetadata} />);

    expect(
      screen.getByPlaceholderText("Search parameters or variables"),
    ).toBeInTheDocument();
    expect(screen.getByText("Parameter One")).toBeInTheDocument();
    expect(screen.getByText("Variable One")).toBeInTheDocument();
    expect(screen.getByText("Variable Two")).toBeInTheDocument();
  });

  it("filters cards based on search query", async () => {
    render(<VariableParameterExplorer metadata={mockMetadata} />);

    const searchInput = screen.getByPlaceholderText(
      "Search parameters or variables",
    );
    fireEvent.change(searchInput, { target: { value: "Parameter One" } });

    await waitFor(() => {
      expect(screen.getByText("Parameter One")).toBeInTheDocument();
      expect(screen.queryByText("Variable One")).not.toBeInTheDocument();
      expect(screen.queryByText("Variable Two")).not.toBeInTheDocument();
    });
  });

  it("filters cards based on python name search", async () => {
    render(<VariableParameterExplorer metadata={mockMetadata} />);

    const searchInput = screen.getByPlaceholderText(
      "Search parameters or variables",
    );
    fireEvent.change(searchInput, { target: { value: "variable_one" } });

    await waitFor(() => {
      expect(screen.getByText("Variable One")).toBeInTheDocument();
      expect(screen.queryByText("Parameter One")).not.toBeInTheDocument();
      expect(screen.queryByText("Variable Two")).not.toBeInTheDocument();
    });
  });

  it("hides abolition parameters by default", () => {
    render(<VariableParameterExplorer metadata={mockMetadata} />);

    expect(screen.getByText("Parameter One")).toBeInTheDocument();
    expect(screen.queryByText("Parameter Two")).not.toBeInTheDocument();
  });

  it("shows abolition parameters when checkbox is checked", async () => {
    render(<VariableParameterExplorer metadata={mockMetadata} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(screen.getByText("Parameter One")).toBeInTheDocument();
      expect(screen.getByText("Parameter Two")).toBeInTheDocument();
    });
  });

  it("displays tooltip for abolition parameters checkbox", () => {
    render(<VariableParameterExplorer metadata={mockMetadata} />);

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toHaveAttribute(
      "title",
      "Abolition parameters are used to remove all impacts from a standard parameter, usually by setting its value to 0",
    );
  });

  it("returns null when metadata is not provided", () => {
    const { container } = render(<VariableParameterExplorer metadata={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("sorts cards alphabetically by label", () => {
    const unsortedMetadata = {
      parameters: {},
      variables: {
        var1: {
          name: "variable_z",
          label: "Z Variable",
          description: "Last variable",
        },
        var2: {
          name: "variable_a",
          label: "A Variable",
          description: "First variable",
        },
      },
    };

    render(<VariableParameterExplorer metadata={unsortedMetadata} />);

    const cards = screen.getAllByTestId("card");
    const firstCard = cards[0];
    const secondCard = cards[1];

    expect(firstCard).toHaveTextContent("A Variable");
    expect(secondCard).toHaveTextContent("Z Variable");
  });
});
