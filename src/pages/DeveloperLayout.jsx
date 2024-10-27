import Header from "../layout/Header.jsx";
import Footer from "../layout/Footer.jsx";
import style from "../style/index.js";
import PageHeader from "../layout/PageHeader.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

export default function DeveloperLayout() {
  const { pathname } = useLocation();

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const renderMainContent = () => (
    <>
      <Header />
      <PageHeader
        title="Developer Tools"
        backgroundColor={style.colors.BLUE_98}
      >
        <p style={{ margin: 0 }}>
          Welcome to the Developer Tools page for PolicyEngine. This hub is
          designed to enhance your experience with our open-source projects by
          providing quick access to essential resources.
        </p>
      </PageHeader>
      <Outlet />
      <Footer />
    </>
  );

  if (pathname.length > 20) {
    return <main><Outlet /></main>;
  }

  return (
    <main>
      <Helmet>
        <title>Developer Tools | PolicyEngine</title>
      </Helmet>
      {renderMainContent()}
    </main>
  );
}
