import { useDisplayCategory } from "../controls/Responsive";
import style from "../../style";
import { TextBox } from "../controls/TextBox";
import { ActionButton } from "../controls/ActionButton";

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
        padding: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw" }}>
        <h2 style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Subscribe to PolicyEngine
        </h2>
        <p style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Get the latests posts delivered right to your inbox.
        </p>
      </div>
      <div style={{ width: "40vw" }}>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width={500}
        />
        <ActionButton text="Subscribe" onClick={() => {}} width={500} />
      </div>
    </div>
  );
}

function SubscribeToPolicyEngineTablet() {
  return (
    <div
      style={{
        padding: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw", paddingRight: 50 }}>
        <h2 style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Subscribe to PolicyEngine
        </h2>
        <p style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Get the latests posts delivered right to your inbox.
        </p>
      </div>
      <div style={{ width: "40vw" }}>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width={400}
        />
        <ActionButton text="Subscribe" onClick={() => {}} width={400} />
      </div>
    </div>
  );
}

function SubscribeToPolicyEngineMobile() {
  return (
    <div
      style={{
        padding: 30,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 50 }}>
        <h2 style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Subscribe to PolicyEngine
        </h2>
        <p style={{ fontFamily: "Roboto Serif", color: style.colors.WHITE }}>
          Get the latests posts delivered right to your inbox.
        </p>
      </div>
      <div>
        <TextBox
          title="Email"
          placeholder="Enter your email address"
          width="100%"
        />
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
