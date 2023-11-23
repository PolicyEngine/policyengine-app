import { useState } from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { screen } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from "react-router-dom";

import CookieConsent from "layout/CookieConsent";
import HouseholdOutput from "pages/household/output/HouseholdOutput";

jest.mock("react-plotly.js", () => jest.fn());

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn()
  };
});

describe("Test cookie consent pop-up", () => {
  test("Test that pop-up appears without cookie existing", async () => {
    // Launch CookieConsent
    const {getByText} = render(<CookieConsent />);

    // Wait for pop-up to appear
    await new Promise((r) => setTimeout(r, 1250));

    // Ensure that component returns
    await waitFor(() => {
      expect(getByText("Accept")).toBeInTheDocument();
    })

  });

  test("Test that pop-up does not appear if cookies have been accepted", async () => {
    // Mock cookie that matches desired
    Object.defineProperty(window.document, 'cookie', {
      configurable: true,
      writable: true,
      value: "consent=granted;max-age=31536000;path=/"
    });

    // Launch CookieConsent
    render(<CookieConsent />)

    // Wait for pop-up to appear
    await new Promise((r) => setTimeout(r, 1250));

    // Ensure that return is null
    await waitFor(() => {
      const acceptButton = screen.queryByText("Accept");
      expect(acceptButton).toBeNull();
    });

    // Remove cookie
      delete window.document.cookie;

  });

});
describe("Test PoliciesModelledPopup", () => {
  test("Test that pop-up appears after beginning calculations", () => {
    const testProps = {
      policy: {
        reform: {
          label: "testVal"
        },
        baseline: {
          label: "testVal"
        }
      }
    };

    useSearchParams.mockImplementation(() => {
      const get = () => "gov.irs.ald.loss.capital.max.HEAD_OF_HOUSEHOLD";
      return [{ get }];
    });

    const {getByText} = render(
      <BrowserRouter>
        <HouseholdOutput
          loading={true}
          policy={testProps.policy}
        />
      </BrowserRouter>
    );

    expect(getByText("PolicyEngine results may not constitute exact tax liabilities or benefit entitlements.")).toBeInTheDocument();

  });
});