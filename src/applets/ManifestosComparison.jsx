import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";

export default function ManifestosComparison() {

  const windowHeight = useWindowHeight();

  return (
    <>
      <Helmet>
        <title>UK 2024 Manifestos Comparison | PolicyEngine</title>
      </Helmet>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: windowHeight - style.spacing.HEADER_HEIGHT,
          width: "100vw"
        }}
      >
        <iframe
          src="https://manifestos.streamlit.app?embedded=true"
          title="UK 2024 Manifestos Comparison"
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT})`}
          width="100%"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
