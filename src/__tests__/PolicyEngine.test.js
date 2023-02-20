import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PolicyEngineRoutes } from "../PolicyEngine";
import PolicyEngineCountry from "../PolicyEngineCountry";

describe("test routing", () => {
    test("should redirect an invalid country to the uk page", async () => {
        render(
            <MemoryRouter initialEntries={["/invalidCountry"]}>
                <PolicyEngineRoutes />
            </MemoryRouter>
        );

        // Render the uk site.
        // This doesn't exactly guarantee that the UK page
        // in particular is being loaded, but it does indicate
        // that a country page is being loaded instead of nothing.
        expect(screen.getAllByRole("heading")[0].textContent).toMatchSnapshot();
    });

    test("should redirect to the 404 page if bad url on a country page", async () => {
        render(
            <MemoryRouter initialEntries={['/uk/nonsense']}>
                <PolicyEngineCountry countryId="uk" />
            </MemoryRouter>
        );

        expect(screen.getByText(/Sorry/).textContent).toMatchSnapshot();
    });
})