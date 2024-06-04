import style from "../style";
import Footer from "./Footer";
import Header from "./Header";

export default function ErrorPage(props) {
  // The error page displayed when the metadata call failed.
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
