import Header from "../layout/Header.jsx";
import Footer from "../layout/Footer.jsx";
import Section from "../layout/Section.jsx";
import style from "../style/index.js";
import PageHeader from "../layout/PageHeader.jsx";
import { devTools } from "../data/developerToolsList.js";
import useDisplayCategory from "../hooks/useDisplayCategory.js";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import LinkButton from "../controls/LinkButton.jsx";
import { useEffect, useState } from "react";

export default function DeveloperLayout() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const countryId = pathParts[1]; // Assumes the countryId is always the second segment in the path
  const displayCategory = useDisplayCategory();

  return (
    <>
      <Helmet>
        <title>Developer Hub | PolicyEngine</title>
      </Helmet>
      <div>
        <Header />
        <PageHeader
          title="Developer Hub"
          backgroundColor={style.colors.BLUE_98}
        >
          <p style={{ margin: 0 }}>
            Welcome to the Developer Hub page for PolicyEngine! This hub is
            designed to enhance your experience with our open-source projects by
            providing quick access to essential resources.
          </p>
        </PageHeader>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

const DynamicBanner = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");

  return (
    <>
      <PageHeader title="Developer Hub" backgroundColor={style.colors.BLUE_98}>
        <p style={{ margin: 0 }}>
          Welcome to the Developer Hub page for PolicyEngine! This hub is
          designed to enhance your experience with our open-source projects by
          providing quick access to essential resources.
        </p>
      </PageHeader>
    </>
  );
};
