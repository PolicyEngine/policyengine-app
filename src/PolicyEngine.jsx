import "./style/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import PolicyEngineCountry from "./PolicyEngineCountry";
import gtag from "./api/analytics";
import { StatusPage } from "./pages/StatusPage";
import { motion } from "framer-motion";
import React from "react";
import Button from "./controls/Button";
import style from "./style";
import useMobile from "./layout/Responsive";

/*
 * This component is split out of the main
 * component for testing purposes: you can't
 * have nested routers in a test.
 */

function CookieConsent() {
  /* An animated bottom-left popup that asks the user to accept cookies */
  // We'll use a 'consent' cookie to remember the user's choice
  // first, check if it's already set
  const consentCookie = document.cookie.split(";").find((cookie) => {
    return cookie.trim().startsWith("consent=");
  });
  const consent = consentCookie && consentCookie.split("=")[1];
  // if it's set, don't show the popup and return null
  if (consent) {
    return null;
  }
  const [show, setShow] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [searchParams] = useSearchParams();
  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  });

  const acceptCookies = () => {
    // Give animation time to finish
    setAccepted(true);
    setTimeout(() => {
      setShow(false);
      // Set the consent cookie to 'granted'
      document.cookie = "consent=granted;max-age=31536000;path=/";
    }, 500);

    
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied'
    });
    gtag("js", new Date());
    gtag("config", "G-91M4529HE7");
  }

  const noCookies = () => {
    // Give animation time to finish
    setAccepted(true);
    setTimeout(() => {
      setShow(false);
    }, 500);
  }

  const mobile = useMobile();
  searchParams;
  return (
    <>
    {show && !searchParams.get("embed") && 
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: accepted ? 0 : 1, y: accepted ? 200 : 0 }}
        transition={{ 
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="cookie-consent"
        style={{ 
          position: "fixed", bottom: 20, left: 0,
          padding: "1em", background: style.colors.WHITE,
          zIndex: 1000, borderRadius: 50, x: mobile ? 0 : "30vw",
          display: "flex", alignItems: "center",
          flexDirection: mobile ? "column" : "row",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          paddingLeft: 20, paddingRight: 20,
      }}
      >
        <p style={{margin: 0, marginBottom: mobile && 10, marginTop: 10}}>
          This site uses cookies to improve your experience.
        </p>
        <div style={{display: "flex"}}>
        <Button onClick={acceptCookies} text="Accept" style={{marginLeft: 20}} primary/>
        <Button onClick={noCookies} text="Decline" style={{marginLeft: 20}} />
        </div>
      </motion.div>
    }
    </>
  );
}
export function PolicyEngineRoutes() {
  // Look up the country ID from the user's browser language
  const browserLanguage = navigator.language;
  const countryId = browserLanguage === "en-US" ? "us" : "uk";
  return (
    <Routes>
      <Route path="/uk/*" element={<PolicyEngineCountry countryId="uk" />} />
      <Route path="/us/*" element={<PolicyEngineCountry countryId="us" />} />
      <Route path="/ca/*" element={<PolicyEngineCountry countryId="ca" />} />
      <Route path="/ng/*" element={<PolicyEngineCountry countryId="ng" />} />
      <Route path="/api-status" element={<StatusPage />} />
      <Route path="/*" element={<Navigate to={`/${countryId}`} />} />
    </Routes>
  );
}

function clearCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

clearCookies;

export default function PolicyEngine() {
  return (
    <>
    <Router>
      <PolicyEngineRoutes />
    </Router>
    <CookieConsent />
    </>
  );
}
