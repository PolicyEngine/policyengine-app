import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";

export default function OBBBAHouseholdExplorer() {
  const windowHeight = useWindowHeight();

  return (
    <>
      <Helmet>
        <title>OBBBA Household Explorer | PolicyEngine</title>
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
          src="https://obbba-household-explorer.streamlit.app?embedded=true"
          title="OBBBA Household Explorer"
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT})`}
          width="100%"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}