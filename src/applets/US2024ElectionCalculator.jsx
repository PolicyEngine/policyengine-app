import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";

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
        <iframe
          src="https://trump-harris-tax.streamlit.app/?embedded=true"
          title="2024 Election, Personal Household Impact Calculator"
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT})`}
          width="100%"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
