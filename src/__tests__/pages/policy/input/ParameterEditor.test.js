import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ValueSetter } from "../../../../pages/policy/input/ParameterEditor";
import { IntervalMap } from "../../../../algorithms/IntervalMap";
import { cmpDates, nextDay } from "lang/stringDates";
import { BrowserRouter } from "react-router-dom";

describe("ValueSetter", () => {
  const policyStartDate = "2023-01-01";
  const reformStartDate = "2024-01-01";
  const reformEndDate = "2028-12-31";
  const policyEndDate = "2100-12-31";
  const evaluationDate = "2025-01-01";

  function createMockPolicy(validParamName, validStartDate, baselineValue) {
    return {
      baseline: {},
      reform: {
        data: {
          [validParamName]: {
            [validStartDate]: baselineValue,
          },
        },
      },
    };
  }

  function setupTest(reformValue, baselineValue) {
    const reformValues = [[`${reformStartDate}.${reformEndDate}`, reformValue]];

    const baseValues = [[policyStartDate, baselineValue]];

    const baseMap = new IntervalMap(baseValues, cmpDates, (x, y) => x === y);
    const reformMap = baseMap.copy();
    reformValues.forEach(([timePeriod, value]) => {
      const [startDate, endDate] = timePeriod.split(".");
      reformMap.set(startDate, nextDay(endDate), value);
    });
    const validPolicy = createMockPolicy(
      booleanParamName,
      policyStartDate,
      baselineValue,
    );
    return {
      baseMap,
      reformMap,
      validPolicy,
    };
  }

  const booleanParamName = "booleanParam";
  const numericParamName = "numericParam";
  const mockMetadata = {
    parameters: {
      [booleanParamName]: {
        unit: "bool",
        description: "A boolean parameter",
      },
      [numericParamName]: {
        unit: "currency-GBP",
        description: "A numeric parameter",
      },
    },
  };

  test("given valid Boolean-type parameter, renders correctly", () => {
    const reformValue = true;
    const baselineValue = false;

    const { baseMap, reformMap, validPolicy } = setupTest(
      reformValue,
      baselineValue,
    );

    render(
      <BrowserRouter>
        <ValueSetter
          startDate={evaluationDate}
          endDate={policyEndDate}
          parameterName={booleanParamName}
          metadata={mockMetadata}
          policy={validPolicy}
          reformMap={reformMap}
          baseMap={baseMap}
        />
      </BrowserRouter>,
    );
    screen.debug();
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeInTheDocument();
  });
  test("given valid Number-type parameter, renders correctly", () => {
    const baselineValue = 10;
    const reformValue = 20;

    const { baseMap, reformMap, validPolicy } = setupTest(
      reformValue,
      baselineValue,
    );

    render(
      <BrowserRouter>
        <ValueSetter
          startDate={evaluationDate}
          endDate={policyEndDate}
          parameterName={numericParamName}
          metadata={mockMetadata}
          policy={validPolicy}
          reformMap={reformMap}
          baseMap={baseMap}
        />
      </BrowserRouter>,
    );

    const inputBox = screen.getByRole("spinbutton");
    expect(inputBox).toBeInTheDocument();
    expect(inputBox).toHaveValue(String(reformValue));
  });
});
