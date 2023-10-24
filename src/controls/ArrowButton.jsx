import Button from "./Button";

export default function ArrowButton(props) {

  const {direction, onClick, primary, disabled, style} = props;

  return (
    <Button
      text={
        <span className="material-symbols-outlined">
          {direction === "left" ? "arrow_back" : "arrow_forward"}
        </span>
      }
      width={30}
      size={"60px"}
      onClick={onClick}
      primary={primary}
      disabled={disabled}
      style={style}
      hoverEffectStart={
        direction === "left" ? "right" : "left"
      }
    />
  )
}