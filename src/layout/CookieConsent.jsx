import "../redesign/style/App.css";
import { motion } from "framer-motion";
import React from "react";
import Button from "../controls/Button";
import useDisplayCategory from "redesign/components/useDisplayCategory";
import colors from "redesign/style/colors";

/*
 * This component is split out of the main
 * component for testing purposes: you can't
 * have nested routers in a test.
 */

export default function CookieConsent() {
  /* An animated bottom-left popup that asks the user to accept cookies */

  const [show, setShow] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const displayCategory = useDisplayCategory();
  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  });

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

  // get searchParams from the URL without using useSearchParams
  const searchParams = new URLSearchParams(window.location.search);

  const acceptCookies = () => {
    // Give animation time to finish
    setAccepted(true);
    setTimeout(() => {
      setShow(false);
      // Set the consent cookie to 'granted'
      document.cookie = "consent=granted;max-age=31536000;path=/";
    }, 500);
  };

  const noCookies = () => {
    // Give animation time to finish
    setAccepted(true);
    setTimeout(() => {
      setShow(false);
    }, 500);
  };

  return (
    <>
      {show && !searchParams.get("embed") && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: accepted ? 0 : 1, y: accepted ? 200 : 0 }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
          className="cookie-consent"
          style={{
            position: "fixed",
            width: "fit-content",
            bottom: 20,
            left: 0,
            right: 0,
            padding: "1em",
            paddingTop:
              displayCategory === "mobile" ? "calc(1em + 10px)" : "1em",
            paddingBottom:
              displayCategory === "mobile" ? "calc(1em + 10px)" : "1em",
            background: colors.WHITE,
            zIndex: 1000,
            borderRadius: 0,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            flexDirection: displayCategory === "mobile" ? "column" : "row",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            paddingLeft: 20,
            paddingRight: 20,
            gap: "20px",
          }}
        >
          <p style={{ margin: 0 }}>
            This site uses cookies to improve your experience.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: displayCategory === "mobile" ? "column" : "row",
              gap: "20px",
            }}
          >
            <Button
              onClick={acceptCookies}
              text="Accept"
              // style={{ marginLeft: 20 }}
              type="primary"
            />
            <Button
              onClick={noCookies}
              text="Decline"
              // style={{ marginLeft: 20 }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

/* function clearCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

clearCookies; */
