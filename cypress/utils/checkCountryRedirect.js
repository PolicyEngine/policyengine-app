export const checkCountryRedirect = (country, regexArg = "") => {
  cy.location("pathname").should((loc) => {
    const path = loc.split("/");
    expect(path[1]).to.equal(country);
  });

  cy.get("#home-used-by").then(($ele) => {
    const text = $ele.text()?.toLowerCase();
    const regex = new RegExp(regexArg, "i");
    expect(regex.test(text)).to.equal(true);
  });
};
