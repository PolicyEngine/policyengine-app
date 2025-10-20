import StreamlitEmbed from "./StreamlitEmbed";

export default function GiveCalc() {
  return (
    <StreamlitEmbed
      embedUrl="https://givecalc.streamlit.app?embedded=true"
      directUrl="https://givecalc.streamlit.app"
      title="GiveCalc"
      iframeTitle="GiveCalc"
    />
  );
}
