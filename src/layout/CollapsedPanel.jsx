import CollapseButton from "../controls/CollapseButton";
import style from "../style";

export default function CollapsedPanel(props) {
  const {
    title,
    collapseButton,
  } = props;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: style.colors.LIGHT_GRAY,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <p
        style={{
          writingMode: "sideways-lr",
          margin: "0",
          paddingTop: "30px",
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