import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import StreamlitWakeUp from "../components/StreamlitWakeUp";

export default function CitizensEconomicCouncil() {
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
          height: "calc(100vh - 80px)",
        }}
      >
        <div style={{ width: "800px", height: "800px" }}>
          <StreamlitWakeUp
            streamlitUrl="https://policyengine-cec-simulator.streamlit.app?embedded=true"
            title="Citizens' Economic Council reform simulator"
            wakeUpUrl="https://policyengine-cec-simulator.streamlit.app"
            iframeProps={{
              height: "800",
              width: "800",
            }}
          >
            <p style={{ fontSize: "14px", color: "#666", marginTop: "0.5rem" }}>
              If the app is sleeping, click &quot;Wake up app&quot; to open it
              in a new tab and wake it up.
            </p>
          </StreamlitWakeUp>
        </div>
      </div>
    </>
  );
}
