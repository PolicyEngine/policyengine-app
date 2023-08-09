import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../controls/InputField";

const testProps = {
  placeholder: "Test Placeholder",
  onChange: jest.fn(),
};
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

test("Should handle non-percent input & submit on blur", () => {
  const { input } = setup(testProps);
  fireEvent.change(input, { target: { value: testInput } });
  expect(input.value).toBe(testInput);
  expect(testProps.onChange).not.toHaveBeenCalled();

  fireEvent.blur(input);
  expect(testProps.onChange).toHaveBeenCalledWith(testInput);
});

test("Should append '%' for percent pattern & submit on blur", () => {
  const { input } = setup({ ...testProps, ...patternProp });
  fireEvent.change(input, { target: { value: testInput } });
  expect(input.value).toBe(testInput + "%");
  expect(testProps.onChange).not.toHaveBeenCalled();

  fireEvent.blur(input);
  expect(testProps.onChange).toHaveBeenCalledWith(testInput + "%");
});
