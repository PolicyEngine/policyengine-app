import style from "../style";
import Section from "./Section";
import SmallForm from "../../layout/SmallForm";
import useDisplayCategory from "./useDisplayCategory";

export default function HomeSubscribe() {
  return (
    <Section backgroundColor={style.colors.BLUE_PRESSED}>
      <SubscribeToPolicyEngine />
    </Section>
  );
}

export function SubscribeToPolicyEngine({displaySize}) {
  const displayCategory = useDisplayCategory();

  const submitLink = "https://policyengine.us5.list-manage.com/subscribe/post?u=e5ad35332666289a0f48013c5&amp;id=71ed1f89d8&amp;f_id=00f173e6f0";
  const submitButtonText = "Subscribe";
  const inputFields = [
    {
      label: "email",
      type: "email",
      placeholder: "Enter your email address"
    }
  ];

  return (
    <div
      style={{
        backgroundColor: style.colors.BLUE_PRESSED,
      }}
    >
      {
        {
          mobile: <SubscribeToPolicyEngineMobile 
            inputFields={inputFields}
            submitLink={submitLink}
            submitButtonText={submitButtonText}
          />,
          tablet: <SubscribeToPolicyEngineTablet 
            inputFields={inputFields} 
            submitLink={submitLink}
            submitButtonText={submitButtonText}
          />,
          desktop: <SubscribeToPolicyEngineDesktop 
            inputFields={inputFields} 
            submitLink={submitLink}
            submitButtonText={submitButtonText}
          />,
        }[displaySize || displayCategory]
      }
    </div>
  );
}

function SubscribeToPolicyEngineDesktop(props) {
  const {
    inputFields,
    submitLink,
    submitButtonText
  } = props;

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
      <SmallForm 
        inputFields={inputFields}
        action={submitLink}
        method="post"
        submitButtonText={submitButtonText}
        containerStyle={{width: "40vw"}}
        formStyle={{width: "500px"}}
        buttonStyle={{width: "500px"}}
      />
    </div>
  );
}

function SubscribeToPolicyEngineTablet(props) {
  const {
    inputFields,
    submitLink,
    submitButtonText
  } = props;

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
      <SmallForm 
        inputFields={inputFields}
        action={submitLink}
        method="post"
        submitButtonText={submitButtonText}
        containerStyle={{width: "40vw"}}
        formStyle={{width: "400px"}}
        buttonStyle={{width: "400px"}}
      />
    </div>
  );
}

export function SubscribeToPolicyEngineMobile(props) {
  const {
    inputFields,
    submitLink,
    submitButtonText
  } = props;

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
      <SmallForm 
        inputFields={inputFields}
        action={submitLink}
        method="post"
        submitButtonText={submitButtonText}
      />
    </div>
  );
}
