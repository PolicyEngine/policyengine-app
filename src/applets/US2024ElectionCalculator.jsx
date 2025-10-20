import StreamlitEmbed from "./StreamlitEmbed";

export default function US2024ElectionCalculator() {
  return (
    <StreamlitEmbed
      embedUrl="https://trump-harris-tax.streamlit.app/?embedded=true"
      directUrl="https://trump-harris-tax.streamlit.app"
      title="2024 Election Houshold Calculator"
      iframeTitle="2024 Election, Personal Household Impact Calculator"
    />
  );
}
