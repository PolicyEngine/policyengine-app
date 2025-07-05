import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { apps } from "../apps/appTransformers";
import { Helmet } from "react-helmet";

export default function AppPage() {
  const { appName } = useParams();

  const app = apps.find((app) => app.slug === appName);

  if (!app) {
    return (
      <>
        <Header />
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h1>App not found</h1>
          <p>The app &ldquo;{appName}&rdquo; could not be found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{app.title} - PolicyEngine</title>
        <meta name="description" content={app.description} />
      </Helmet>
      <Header />
      <div style={{ height: "var(--app-content-height)" }}>
        <iframe
          src={app.url}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title={app.title}
          aria-label={app.description}
        />
      </div>
      <Footer />
    </>
  );
}
