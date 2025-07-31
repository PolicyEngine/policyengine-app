import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import StreamlitWakeUp from "../components/StreamlitWakeUp";

export default function TrafwaCalculator() {
  return (
    <>
      <Helmet>
        <title>TRAFWA Calculator | PolicyEngine</title>
      </Helmet>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 80px)",
        }}
      >
        <div style={{ width: "1000px", height: "800px" }}>
          <StreamlitWakeUp
            streamlitUrl="https://policyengine-trafwa-child-tax-credit.streamlit.app?embedded=true"
            title="TRAFWA Child Tax Credit Calculator"
            wakeUpUrl="https://policyengine-trafwa-child-tax-credit.streamlit.app"
            iframeProps={{
              height: "800",
              width: "1000",
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
