import ErrorComponent from "./ErrorComponent";
import Footer from "./Footer";
import Header from "./Header";

export default function ErrorPage(props) {
  // The error page displayed when the metadata call failed.
  return (
    <>
      <Header />
      <ErrorComponent message={props.message} />
      <Footer />
    </>
  );
}
