import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";

export default function ACACalc() {
  const windowHeight = useWindowHeight();

  return (
    <>
      <Helmet>
        <title>ACA-Calc | PolicyEngine</title>
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
        <iframe
          src="https://policyengine-aca-calc.streamlit.app?embedded=true"
          title="ACA-Calc"
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT})`}
          width="100%"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
