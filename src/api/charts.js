import PolicyEngineLogoBlue from "../images/logos/policyengine/blue.png";

export const ChartLogo = (x, y) => ({
  images: [
    {
      source: PolicyEngineLogoBlue,
      xref: "paper",
      yref: "paper",
      x: x,
      y: y,
      sizex: 0.15,
      sizey: 0.15,
      xanchor: "right",
      yanchor: "bottom",
    },
  ],
});
