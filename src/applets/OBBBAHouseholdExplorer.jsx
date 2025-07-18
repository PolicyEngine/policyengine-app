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
          width: "100%",
        }}
      >
        <iframe
          src={
            process.env.REACT_APP_OBBBA_IFRAME_URL ||
            "https://policyengine.github.io/obbba-scatter"
          }
          title="OBBBA Household Explorer"
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT})`}
          width="100%"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
