import style from "../style";
import Section from "./Section";
import ActionButton from "./ActionButton";
import TextBox from "./TextBox";
import useDisplayCategory from "./useDisplayCategory";

export default function HomeSubscribe() {
  return (
    <Section backgroundColor={style.colors.BLUE_PRESSED}>
      <SubscribeToPolicyEngine />
    </Section>
  );
}

export function SubscribeToPolicyEngine() {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        backgroundColor: style.colors.BLUE_PRESSED,
      }}
    >
      {
        {
          mobile: <SubscribeToPolicyEngineMobile />,
          tablet: <SubscribeToPolicyEngineTablet />,
          desktop: <SubscribeToPolicyEngineDesktop />,
        }[displayCategory]
      }
    </div>
  );
}

function SubscribeToPolicyEngineDesktop() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw" }}>
        <h2 style={{ color: "white" }}>Subscribe to PolicyEngine</h2>
        <p>Get the latests posts delivered right to your inbox.</p>
      </div>
      <div style={{ width: "40vw" }}>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width={500}
        />
        <div style={{ marginTop: 20 }} />
        <ActionButton text="Subscribe" onClick={() => {}} width={500} />
      </div>
    </div>
  );
}

function SubscribeToPolicyEngineTablet() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw", paddingRight: 50 }}>
        <h2 style={{ color: "white" }}>Subscribe to PolicyEngine</h2>
        <p>Get the latests posts delivered right to your inbox.</p>
      </div>
      <div style={{ width: "40vw" }}>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width={400}
        />
        <div style={{ marginTop: 20 }} />
        <ActionButton text="Subscribe" onClick={() => {}} width={400} />
      </div>
    </div>
  );
}

export function SubscribeToPolicyEngineMobile() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 50 }}>
        <h2 style={{ color: "white" }}>Subscribe to PolicyEngine</h2>
        <p>Get the latests posts delivered right to your inbox.</p>
      </div>
      <div>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width="100%"
        />
        <div style={{ marginTop: 20 }} />
        <ActionButton
          text="Subscribe"
          onClick={() => {}}
          width="100%"
          size="500px"
        />
      </div>
    </div>
  );
}
