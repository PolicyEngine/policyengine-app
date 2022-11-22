import Spinner from "./Spinner";

export default function LoadingCentered(props) {
  const { message, size } = props;
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "block", textAlign: "center" }}>
        {message && (
          <h4>
            {message}
            <br></br>
          </h4>
        )}
        <Spinner size={size} />
      </div>
    </div>
  );
}
