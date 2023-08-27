import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../controls/InputField";
import { useSearchParams } from "react-router-dom";

const testProps = {
  placeholder: "Test Placeholder",
  onChange: jest.fn(),
};
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});
const patternProp = { pattern: "%" };
const testInput = "Test Input";

const setup = (props) => {
  const utils = render(<InputField {...props} />);
  const input = screen.getByPlaceholderText(testProps.placeholder);

  return {
    input,
    ...utils,
  };
};

describe("Should take inputs", () => {
  test("Should handle non-percent input & submit on blur", () => {
    useSearchParams.mockImplementation(() => {
      const get = () => "gov.irs.ald.loss.capital.max.HEAD_OF_HOUSEHOLD";
      return [{ get }];
    });
    const { input } = setup(testProps);
    fireEvent.change(input, { target: { value: testInput } });
    expect(input.value).toBe(testInput);
    expect(testProps.onChange).not.toHaveBeenCalled();

    fireEvent.blur(input);
    expect(testProps.onChange).toHaveBeenCalledWith(testInput);
  });

  test("Should append '%' for percent pattern & submit on blur", () => {
    useSearchParams.mockImplementation(() => {
      const get = () => "gov.irs.ald.loss.capital.max.HEAD_OF_HOUSEHOLD";
      return [{ get }];
    });
    const { input } = setup({ ...testProps, ...patternProp });
    fireEvent.change(input, { target: { value: testInput } });
    expect(input.value).toBe(testInput + "%");
    expect(testProps.onChange).not.toHaveBeenCalled();

    fireEvent.blur(input);
    expect(testProps.onChange).toHaveBeenCalledWith(testInput + "%");
  });
});
