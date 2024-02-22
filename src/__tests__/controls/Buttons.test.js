import { fireEvent, render } from "@testing-library/react";

import Button from "controls/Button";
import LinkButton from "controls/LinkButton";

jest.mock("react-plotly.js", () => jest.fn());

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Test button types", () => {
  test("Button renders and fires onClick properly", () => {
    const mockOnClick = jest.fn();

    const testButton = <Button text="Test Button" onClick={mockOnClick()} />;

    const { getByText } = render(testButton);

    fireEvent.click(getByText("Test Button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  test("LinkButton renders properly and properly navigates to internal link", () => {
    const testButton = <LinkButton text="Test Button" link="/test" />;

    const { getByText } = render(testButton);

    fireEvent.click(getByText("Test Button"));
    expect(mockUseNavigate.mock.calls[0][0]).toBe("/test");
  });
});
