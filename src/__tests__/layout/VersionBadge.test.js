import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VersionBadge from "../../layout/VersionBadge";

describe("VersionBadge", () => {
  test("renders a compact strip with the country package version and dataset", () => {
    render(
      <VersionBadge
        countryId="us"
        modelVersion="1.653.3"
        dataset="enhanced_cps"
      />,
    );
    expect(
      screen.getByLabelText(/versions used for this result/i),
    ).toHaveTextContent("policyengine-us@1.653.3 · enhanced_cps");
  });

  test("renders nothing when modelVersion is missing", () => {
    const { container } = render(
      <VersionBadge countryId="us" dataset="enhanced_cps" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("maps country ids to package names", () => {
    render(
      <VersionBadge countryId="uk" modelVersion="2.88.0" dataset="default" />,
    );
    expect(screen.getByLabelText(/versions used/i)).toHaveTextContent(
      "policyengine-uk@2.88.0",
    );
  });

  test("falls back to 'default' when dataset is not set", () => {
    render(<VersionBadge countryId="us" modelVersion="1.653.3" />);
    expect(screen.getByLabelText(/versions used/i)).toHaveTextContent(
      "policyengine-us@1.653.3 · default",
    );
  });

  test("includes data version and truncated h5 sha when provided", () => {
    render(
      <VersionBadge
        countryId="us"
        modelVersion="1.653.3"
        dataset="enhanced_cps"
        dataVersion="1.85.2"
        h5Sha="abc1234567890fedcba1234567890fedcba1234567890fedcba1234567890abc"
      />,
    );
    const badge = screen.getByLabelText(/versions used/i);
    expect(badge).toHaveTextContent("enhanced_cps@1.85.2");
    expect(badge).toHaveTextContent("sha256:abc12345");
    expect(badge).not.toHaveTextContent(
      "fedcba1234567890fedcba1234567890fedcba1234567890abc",
    );
  });
});
