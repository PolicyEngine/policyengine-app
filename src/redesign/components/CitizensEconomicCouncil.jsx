import { useEffect } from "react";
import Header from "./Header";

export default function CitizensEconomicCouncil() {
  // Update the title to be "CEC reform simulator | PolicyEngine")
  useEffect(() => {
    document.title = "CEC reform simulator | PolicyEngine";
  }, []);

  return (
    <>
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
