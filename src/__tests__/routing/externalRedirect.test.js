import { render, screen } from "@testing-library/react";
import ExternalRedirect from "../../routing/ExternalRedirect";

describe("ExternalRedirect", () => {
  const replaceMock = jest.fn();
  let originalLocation;

  beforeAll(() => {
    originalLocation = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { replace: replaceMock, href: "http://localhost/" },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  beforeEach(() => replaceMock.mockClear());

  test("redirects the browser to the external URL", () => {
    render(<ExternalRedirect to="https://policybench.org" />);
    expect(replaceMock).toHaveBeenCalledWith("https://policybench.org");
  });

  test("renders a fallback link to the destination", () => {
    render(<ExternalRedirect to="https://policybench.org" />);
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "https://policybench.org",
    );
  });
});
