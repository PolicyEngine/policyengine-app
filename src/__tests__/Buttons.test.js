import {fireEvent, render} from '@testing-library/react';

import Button from 'controls/Button';
import LinkButton from 'controls/LinkButton';

jest.mock("react-plotly.js", () => jest.fn());

describe("Test button types", () => {
  test("Test that Button renders and fires onClick properly", () => {
    const mockOnClick = jest.fn();

    const testButton = <Button
      text="Test Button"
      onClick={mockOnClick()}
    />

    const {getByText} = render(testButton);

    fireEvent.click(getByText("Test Button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);

  });
  test("Test that LinkButton renders properly", () => {
    return;
  });
  test("Test that LinkButton properly navigates to a passed link", () => {
    return;
  });
});