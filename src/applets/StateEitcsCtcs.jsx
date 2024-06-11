import Header from "../layout/Header";
import { Helmet } from "react-helmet";

export default function StateEitcsCtcs() {
  return (
    <>
      <Helmet>
        <title>State EITCs and CTCs | PolicyEngine</title>
      </Helmet>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <iframe
          src="https://us-state-eitcs-ctcs.streamlit.app?embedded=true"
          title="State EITCs and CTCs"
          height="800"
          width="1000"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
