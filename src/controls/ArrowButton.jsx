import Button from "./Button";
import styles from "../redesign/style";
export default function ArrowButton(props) {
  const { direction, onClick, type, style } = props;

  return (
    <Button
      text={
        <span className="material-symbols-outlined">
          {direction === "left" ? "arrow_back" : "arrow_forward"}
        </span>
      }
      width={30}
      height={60}
      size={"60px"}
      onClick={onClick}
      type={type}
      style={{
        ...style,
        outline: "none",
        boxShadow: "none",
        userSelect: "none",
      }}
      hoverStart={direction === "left" ? "right" : "left"}
    />
  );
}
