import StreamlitEmbed from "./StreamlitEmbed";

export default function TrafwaCalculator() {
  return (
    <StreamlitEmbed
      embedUrl="https://policyengine-trafwa-child-tax-credit.streamlit.app?embedded=true"
      directUrl="https://policyengine-trafwa-child-tax-credit.streamlit.app"
      title="TRAFWA Calculator"
      iframeTitle="TRAFWA Child Tax Credit Calculator"
      height="800"
      width="1000"
    />
  );
}
