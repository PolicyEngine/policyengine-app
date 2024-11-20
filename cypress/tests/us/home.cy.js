import { checkCountryRedirect } from "../../utils/checkCountryRedirect";

describe("PolicyEngine Homepage", () => {
  const regexArg = /the\s(us|u\.s\.|usa|united states)/;

  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, "language", {
      value: window.navigator.language,
      configurable: true,
    });
  });

  it("should redirect from root to US homepage by default", () => {
    Object.defineProperty(window.navigator, "language", {
      value: "",
      configurable: true,
    });
    checkCountryRedirect("us", regexArg);
  });

  it("should redirect from root to US homepage if browser language is en-US", () => {
    Object.defineProperty(window.navigator, "language", {
      value: "en-US",
      configurable: true,
    });
    checkCountryRedirect("us", regexArg);
  });
});
