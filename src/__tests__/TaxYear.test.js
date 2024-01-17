import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSearchParams } from "react-router-dom";
import fetch from "node-fetch";
import TaxYear from "pages/household/input/TaxYear";
import { defaultYear } from "data/constants";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
    useNavigate: jest.fn(),
  };
});

useSearchParams.mockImplementation(() => {
  return [
    new URLSearchParams({}), 
    jest.fn()
  ];
});

describe("Test TaxYear component", () => {

  let metadataUS = null;

  beforeAll( async () => {
    const res = await fetch(
      "https://api.policyengine.org/us/metadata",
    );
    const metadataRaw = await res.json();
    metadataUS = metadataRaw.result;

  });

  test("Properly sets display years based on metadata", async () => {

    const setYear = jest.fn();

    const { getByTestId } = render(
      <TaxYear 
        metadata={metadataUS}
        year={defaultYear}
        setYear={setYear}
      />
    );

    fireEvent.mouseDown(getByTestId("taxyear_dropdown").firstElementChild);

    // While using document.querySelector is not best testing practice,
    // Ant Design makes it difficult to correctly test their components
    const yearOptions = document.querySelectorAll(".ant-select-item-option-content");
    expect(yearOptions.length).toStrictEqual(metadataUS.economy_options.time_period.length);
  });
  test("Properly sets state variable for year when selected", () => {

    const setYear = jest.fn();

    const { getByTitle, getByTestId } = render(
      <TaxYear 
        metadata={metadataUS}
        year={defaultYear}
        setYear={setYear}
      />
    );

    const yearOptions = metadataUS.economy_options.time_period;
    const testYearOption = yearOptions[yearOptions.length - 1].label;

    fireEvent.mouseDown(getByTestId("taxyear_dropdown").firstElementChild);
    fireEvent.click(getByTitle(testYearOption));
    expect(setYear).toHaveBeenCalledWith(testYearOption);

  });
  test("Properly displays year for household with set year", () => {

    const setYear = jest.fn();

    const yearOptions = metadataUS.economy_options.time_period;
    const testYearOption = yearOptions[yearOptions.length - 1].label;

    const { getByTestId } = render(
      <TaxYear 
        metadata={metadataUS}
        year={testYearOption}
        setYear={setYear}
      />
    );

    const el = getByTestId("taxyear_dropdown").firstElementChild;
    expect(el.textContent).toStrictEqual(testYearOption);
  });
  /*
  test("Properly updates a household year");
  test("Points to the correct next page");
  */


});

/*
describe("Test updateHouseholdYear function", () => {

  test("Can properly do nothing when same year is provided");
  test("Can properly update for later year");
  test("Can properly update for earlier year");
  test("Properly seeds default year when no year is provided for test var");

});
*/