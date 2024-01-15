import Header from "./Header";
import { Helmet } from "react-helmet";

export default function CitizensEconomicCouncil() {
  // Update the title to be "CEC reform simulator | PolicyEngine")

  return (
    <>
      <Helmet>
        <title>CEC reform simulator | PolicyEngine</title>
      </Helmet>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <iframe
          src="https://policyengine-cec-simulator.streamlit.app?embedded=true"
          title="Citizens' Economic Council reform simulator"
          height="800"
          width="800"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
