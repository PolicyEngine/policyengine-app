import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../controls/InputField";
import { useSearchParams } from "react-router-dom";

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

describe("Should take inputs", () => {
  let testProps = null;
  let setup = null;

  beforeEach(() => {
    testProps = {
      placeholder: "Test Placeholder",
      onChange: jest.fn(),
    };

    setup = (props) => {
      const utils = render(<InputField {...props} />);
      const input = screen.getByPlaceholderText(testProps.placeholder);

      return {
        input,
        ...utils,
      };
    };
  });

  test("Should handle non-percent input & submit on blur", () => {
    console.log(testProps.onChange.mock);
    useSearchParams.mockImplementation(() => {
      const get = () => "gov.irs.ald.loss.capital.max.HEAD_OF_HOUSEHOLD";
      return [{ get }];
    });
    const { input } = setup(testProps);
    fireEvent.change(input, { target: { value: testInput } });
    expect(input.value).toBe(testInput);
    expect(testProps.onChange).not.toHaveBeenCalled();
    console.log(testProps.onChange.mock);

    fireEvent.blur(input);
    expect(testProps.onChange).toHaveBeenCalledWith(testInput);
    console.log(testProps.onChange.mock);
  });

  test("Should append '%' for percent pattern & submit on blur", () => {
    console.log(testProps.onChange.mock);
    useSearchParams.mockImplementation(() => {
      const get = () => "gov.irs.ald.loss.capital.max.HEAD_OF_HOUSEHOLD";
      return [{ get }];
    });
    const { input } = setup({ ...testProps, ...patternProp });
    fireEvent.change(input, { target: { value: testInput } });
    expect(input.value).toBe(testInput + "%");
    expect(testProps.onChange).not.toHaveBeenCalled();
    console.log(testProps.onChange.mock);

    fireEvent.blur(input);
    expect(testProps.onChange).toHaveBeenCalledWith(testInput + "%");
    console.log(testProps.onChange.mock);
  });
});
