import StreamlitEmbed from "./StreamlitEmbed";

export default function CitizensEconomicCouncil() {
  return (
    <StreamlitEmbed
      embedUrl="https://policyengine-cec-simulator.streamlit.app?embedded=true"
      directUrl="https://policyengine-cec-simulator.streamlit.app"
      title="CEC reform simulator"
      iframeTitle="Citizens' Economic Council reform simulator"
      height="800"
      width="800"
    />
  );
}
