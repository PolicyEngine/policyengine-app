import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { baselinePolicyUS } from "../../__setup__/sampleData";
import PolicySearch from "../../../pages/policy/PolicySearch";
import data from "../../__setup__/data.json";

let metadataUS = data["metadataUS"];

describe("PolicySearch", () => {
  test("Should render", () => {

    const testProps = {
      metadata: metadataUS,
      target: "reform",
      policy: baselinePolicyUS,
    };

    render(
      <BrowserRouter>
        <PolicySearch {...testProps}/>
      </BrowserRouter>
    );

    const heading = screen.getByText("Current law");
    expect(heading).toBeInTheDocument();
  });
  /*
  test("On current law, should disable stacking");
  test("On current law, should allow policy selection");
  test("Should stack non-conflicting policies");
  test("On conflicting policies, should prefer second over first");
  */
})