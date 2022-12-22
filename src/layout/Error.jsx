export default function ErrorPage(props) {
  // The error page displayed when the metadata call failed.
  return (
    <div
      style={{
        paddingTop: "20%",
        paddingLeft: "10%",
        minHeight: "80vh",
      }}
    >
      <h2>Sorry, something went wrong.</h2>
      <p>{props.message}</p>
    </div>
  );
}
