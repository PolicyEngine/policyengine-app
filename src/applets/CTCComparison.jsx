import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";

export default function CTCComparison() {
  const windowHeight = useWindowHeight();

  return (
    <>
      <Helmet>
        <title>Child Tax Credit Calculator | PolicyEngine</title>
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
          src="https://vance-harris-ctc-comparison.streamlit.app?embedded=true"
          title="Child Tax Credit Calculator"
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT})`}
          width="100%"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
