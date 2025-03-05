import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCountryId from "../hooks/useCountryId";
import AIContent from "./AIContent";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Helmet } from "react-helmet";

/**
 * AI page component
 * This serves as a wrapper for the AIContent component,
 * which contains the actual content shared between US and UK versions
 */
const AIPage = () => {
  const location = useLocation();
  const countryId = useCountryId();

  useEffect(() => {
    document.title = "AI | PolicyEngine";
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>AI & Machine Learning | PolicyEngine</title>
      </Helmet>
      <Header />
      <AIContent countryId={countryId} isUK={countryId === "uk"} />
      <Footer />
    </>
  );
};

export default AIPage;