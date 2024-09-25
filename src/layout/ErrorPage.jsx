import ErrorComponent from "./ErrorComponent";

export default function ErrorPage(props) {
  // The error page displayed when the metadata call failed.
  return (
    <>
      <ErrorComponent message={props.message} />
    </>
  );
}
