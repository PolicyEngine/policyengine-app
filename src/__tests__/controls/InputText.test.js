import { render, screen, fireEvent } from "@testing-library/react";
import InputText from "../../controls/InputText";
import { useSearchParams } from "react-router-dom";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});
const testInput = "Test Input";

describe("Should take inputs", () => {
  let testProps = null;
  let setup = null;

  beforeEach(() => {
    testProps = {
      placeholder: "Test Placeholder",
      onPressEnter: jest.fn(),
    };

    setup = (props) => {
      const utils = render(<InputText {...props} />);
      const input = screen.getByPlaceholderText(testProps.placeholder);

      return {
        input,
        ...utils,
      };
    };
  });

  test("Should handle input & submit on enter, but not other keys", () => {
    useSearchParams.mockImplementation(() => {
      const get = () => "gov.irs.ald.loss.capital.max.HEAD_OF_HOUSEHOLD";
      return [{ get }];
    });
    const { input } = setup(testProps);
    fireEvent.change(input, { target: { value: testInput } });
    expect(input.value).toBe(testInput);

    fireEvent.keyDown(input, { key: "A" });
    expect(testProps.onPressEnter).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: "Enter" });
    expect(testProps.onPressEnter).toHaveBeenCalledTimes(1);
  });
});
