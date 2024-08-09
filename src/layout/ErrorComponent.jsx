import style from "../style";

export default function ErrorComponent(props) {
  return (
    <div
      style={{
        height: `calc(100vh - ${style.spacing.HEADER_HEIGHT}px)`,
        display: "flex",
        flexDirection: "column",
        paddingLeft: "10vw",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <h2>Sorry, something went wrong.</h2>
      <p>{props.message}</p>
    </div>
  );
}