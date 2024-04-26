import Header from "../../layout/Header";
import { Helmet } from "react-helmet";

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
        }}
      >
        <iframe
          src="https://policyengine-trafwa-child-tax-credit.streamlit.app?embedded=true"
          title="TRAFWA Child Tax Credit Calculator"
          height="800"
          width="1000"
          style={{ overflow: "hidden" }}
        />
      </div>
    </>
  );
}
