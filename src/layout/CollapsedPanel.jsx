import CollapseButton from "../controls/CollapseButton";
import style from "../style";

export default function CollapsedPanel(props) {
  const {
    title,
    collapseButton
  } = props;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: style.colors.LIGHT_GRAY,
        position: "relative",
      }}
    >
      <p
        style={{
          padding: "20px 0px 0px 16px",
          writingMode: "sideways-lr",
          margin: "auto 0",
          fontSize: "12px",
          color: style.colors.DARK_GRAY
        }}
      >
        {title}
      </p>
      {collapseButton}
    </div>
  )
}