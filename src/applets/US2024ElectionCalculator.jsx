import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";
import StreamlitWakeUp from "../components/StreamlitWakeUp";


export default function US2024ElectionCalculator() {
  const windowHeight = useWindowHeight();

  return (
    <>
      <Helmet>
        <title>2024 Election Houshold Calculator | PolicyEngine</title>
      </Helmet>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: windowHeight - style.spacing.HEADER_HEIGHT,
          width: "100vw",
        }}
      >
        <StreamlitWakeUp
          streamlitUrl="https://trump-harris-tax.streamlit.app/?embedded=true"
          title="2024 Election, Personal Household Impact Calculator"
          wakeUpUrl="https://trump-harris-tax.streamlit.app"
          iframeProps={{
            height: `calc(100vh - ${style.spacing.HEADER_HEIGHT})`,
            width: "100%",
          }}
        >
          <p style={{ fontSize: "14px", color: "#666", marginTop: "0.5rem" }}>
            If the app is sleeping, click &quot;Wake up app&quot; to open it in
            a new tab and wake it up.
          </p>
        </StreamlitWakeUp>
      </div>
    </>
  );
}
