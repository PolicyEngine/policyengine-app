import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from '@testing-library/react';

import CookieConsent from "layout/CookieConsent";

describe("Test cookie consent pop-up", () => {
  test("Test that pop-up appears without cookie existing", async () => {
    // Launch CookieConsent
    const {getByText} = render(<CookieConsent />);

    // Wait for pop-up to appear
    await new Promise((r) => setTimeout(r, 1250));

    // Ensure that component returns
    expect(getByText("Accept")).toBeInTheDocument();

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
    const acceptButton = screen.queryByText("Accept");
    expect(acceptButton).toBeNull();

    // Remove cookie
    delete window.document.cookie;

  });

});
describe("Test PoliciesModelledPopup", () => {
  test("Test that pop-up appears after beginning calculations", () => {
  });
});