import StreamlitEmbed from "./StreamlitEmbed";

export default function CTCCalculator() {
  return (
    <StreamlitEmbed
      embedUrl="https://ctc-calculator.streamlit.app?embedded=true"
      directUrl="https://ctc-calculator.streamlit.app"
      title="Child tax credit calculator"
      iframeTitle="Child tax credit calculator"
    />
  );
}
