import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../controls/Button";
import useDisplayCategory from "../hooks/useDisplayCategory";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const displayCategory = useDisplayCategory();

  useEffect(() => {
    const consentCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("consent="));

    const consent = consentCookie && consentCookie.split("=")[1];

    if (!consent) {
      const timer = setTimeout(() => {
        console.log("Setting show to true");
        setShow(true);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timer
    } else {
      console.log("Consent already given, not showing popup");
    }
  }, []);

  const acceptCookies = () => {
    setAccepted(true);
    document.cookie = "consent=granted;max-age=31536000;path=/";
    setTimeout(() => setShow(false), 500);
  };

  const noCookies = () => {
    setAccepted(true);
    setTimeout(() => setShow(false), 500);
  };

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("embed")) {
    return null;
  }

  return (
    <>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: accepted ? 0 : 1, y: accepted ? 200 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="cookie-consent"
          data-testid="cookie-consent-popup"
        >
          <p>This site uses cookies to improve your experience.</p>
          <div>
            <Button
              onClick={acceptCookies}
              text="Accept"
              type="primary"
              data-testid="accept-cookies-button"
            />
            <Button
              onClick={noCookies}
              text="Decline"
              data-testid="decline-cookies-button"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
