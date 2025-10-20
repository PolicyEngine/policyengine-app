import { BrowserRouter } from "react-router-dom";
import { defaultYear } from "../../../../data/constants";
import County from "../../../../pages/household/input/County";
import { createDefaultHousehold } from "../../../../api/variables";
import data from "../../../__setup__/data.json";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getAllCounties } from "../../../../data/counties";

const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(() => [{}, mockSetSearchParams]),
    useNavigate: jest.fn(),
  };
});

let metadataUS = data["metadataUS"];
const allCounties = getAllCounties();

describe("Given County component with default app state...", () => {
  const firstCountyInUS = allCounties[0];
  const secondCountyInUS = allCounties[1];
  const householdWithoutState = createDefaultHousehold(metadataUS);

  const props = {
    metadata: metadataUS,
    householdInput: householdWithoutState,
    setHouseholdInput: jest.fn(),
    year: defaultYear,
    autoCompute: false,
  };

  const CountyWithoutState = (
    <BrowserRouter>
      <County {...props} />
    </BrowserRouter>
  );

  test("component is displayed on render", () => {
    // Given County with default app state...

    // When component is rendered...
    render(CountyWithoutState);

    // Then correct component renders successfully
    const componentHeader = "Which county do you live in?";
    const description = screen.getByRole("heading", {
      name: new RegExp(componentHeader, "i"),
    });
    expect(description).toBeInTheDocument();
  });
  test("component displays expected county as default option", () => {
    // When component is rendered...
    render(CountyWithoutState);

    // Then correct default county is displayed
    const defaultOption = screen.getByTitle(
      firstCountyInUS.getNameAndStateAbbrev(),
    );
    expect(defaultOption).toBeInTheDocument();
  });
  test("on click, component displays list of selectable counties, and this list contains expected items", () => {
    // When component is rendered...
    render(CountyWithoutState);

    const selectBox = screen.getByRole("combobox");
    // Simulate a click to open the select box; use older fireEvent with mouseDown
    // because Ant Design Select component doesn't respond to userEvent.click
    fireEvent.mouseDown(selectBox);

    // Check that the box contains county #2 in the list
    const secondCountyOption = screen.getByTitle(
      secondCountyInUS.getNameAndStateAbbrev(),
    );
    expect(secondCountyOption).toBeInTheDocument();
  });
  test("selecting a county updates the householdInput state", () => {
    // When component is rendered...
    render(CountyWithoutState);

    // Simulate selecting a county
    const selectBox = screen.getByRole("combobox");
    fireEvent.mouseDown(selectBox);

    // Simulate selecting the second county in the list
    const secondCountyOption = screen.getByTitle(
      secondCountyInUS.getNameAndStateAbbrev(),
    );
    secondCountyOption.click();

    // Check that the householdInput state was updated
    expect(props.setHouseholdInput).toHaveBeenCalledWith(
      expect.objectContaining({
        households: expect.objectContaining({
          "your household": expect.objectContaining({
            county_fips: {
              [defaultYear]: secondCountyInUS.getFipsCode(),
            },
          }),
        }),
      }),
    );
  });
});

describe("Given County component with California selected as State...", () => {
  const firstCountyInCA = allCounties.find(
    (county) => county.getStateCode() === "CA",
  );

  test("only counties in California are displayed, with first county as default", () => {
    const householdWithState = createDefaultHousehold(metadataUS);
    householdWithState.households["your household"] = {
      state_name: {
        [defaultYear]: "CA",
      },
    };

    // Given County with default app state...
    const props = {
      metadata: metadataUS,
      householdInput: householdWithState,
      setHouseholdInput: jest.fn(),
      year: defaultYear,
      autoCompute: false,
    };

    // When component is rendered...
    render(
      <BrowserRouter>
        <County {...props} />
      </BrowserRouter>,
    );

    // Then correct default county is displayed
    const defaultOption = screen.getByTitle(
      firstCountyInCA.getNameAndStateAbbrev(),
    );
    expect(defaultOption).toBeInTheDocument();
  });
});
