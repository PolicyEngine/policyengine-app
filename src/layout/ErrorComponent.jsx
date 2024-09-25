export default function ErrorComponent(props) {
  return (
    <div
      style={{
        height: `100%`,
        display: "flex",
        flexDirection: "column",
        padding: 50,
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <h2>Sorry, something went wrong.</h2>
      <p>{props.message}</p>
    </div>
  );
}
