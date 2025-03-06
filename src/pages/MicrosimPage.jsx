import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCountryId from "../hooks/useCountryId";
import MicrosimContent from "./MicrosimContent";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Helmet } from "react-helmet";

/**
 * Microsimulation page component
 * This serves as a wrapper for the MicrosimContent component
 */
const MicrosimPage = () => {
  const location = useLocation();
  const countryId = useCountryId();

  useEffect(() => {
    document.title = "Microsimulation | PolicyEngine";
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Microsimulation | PolicyEngine</title>
      </Helmet>
      <Header />
      <MicrosimContent countryId={countryId} isUK={countryId === "uk"} />
      <Footer />
    </>
  );
};

export default MicrosimPage;
