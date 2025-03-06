import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCountryId from "../../hooks/useCountryId";
import AIGeneralContent from "./AIGeneralContent";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Helmet } from "react-helmet";

// During front-end redesign, this page should be refactored
// to use design system layout components and improved best practices.

/**
 * AI page component
 * This serves as a wrapper for the AIGeneralContent component,
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
      <AIGeneralContent countryId={countryId} isUK={countryId === "uk"} />
      <Footer />
    </>
  );
};

export default AIPage;
