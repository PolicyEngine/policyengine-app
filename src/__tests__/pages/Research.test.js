import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Research from "../../pages/Research";
import { BrowserRouter } from "react-router-dom";

describe("Research Page", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Research />
      </BrowserRouter>,
    );
  });
});
