import ActionButton from "../redesign/components/ActionButton";

export default function Button(props) {
  const { text, onClick, primary, disabled, width } = props;

  if (text === "left") {
    return (
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <ActionButton
          text={<span className="material-symbols-outlined">arrow_back</span>}
          width={30}
          size={"60px"}
          onClick={onClick}
          primary={primary}
          disabled={disabled}
          noArrow
          center
          direction="right"
        />
      </div>
    );
  } else if (text === "right") {
    return (
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <ActionButton
          text={
            <span className="material-symbols-outlined">arrow_forward</span>
          }
          width={30}
          size={"60px"}
          onClick={onClick}
          primary={primary}
          disabled={disabled}
          noArrow
          center
        />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        justifyContent: "center",
        paddingTop: 20,
      }}
    >
      <ActionButton
        text={text}
        onClick={onClick}
        primary={primary}
        disabled={disabled}
        width={width}
      />
    </div>
  );
}
