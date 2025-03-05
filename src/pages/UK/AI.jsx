import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCountryId from "../../hooks/useCountryId";
import AIGeneralContent from "../AIGeneralContent";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Helmet } from "react-helmet";

/**
 * UK AI page component
 * This serves as a wrapper for the AIGeneralContent component,
 * automatically setting isUK to true
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
      <AIGeneralContent countryId={countryId} isUK={true} />
      <Footer />
    </>
  );
};

export default AIPage;
