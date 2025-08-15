import { Container } from "react-bootstrap";
import useMobile from "../../layout/Responsive";
import { Helmet } from "react-helmet";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Link } from "react-router-dom";
import useCountryId from "../../hooks/useCountryId";
import { COUNTRY_NAMES } from "../../data/countries";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

// Import the markdown content as a string
import apiTermsContent from "./api-terms.md";

export default function ApiTermsOfService() {
  const mobile = useMobile();
  const countryId = useCountryId();
  const [markdown, setMarkdown] = useState("");

  const DEFAULT_JURISDICTION = "the United States";

  const getJurisdiction = (id) => {
    const country = COUNTRY_NAMES[id];
    if (country) {
      return country.phrasal || country.standard;
    }
    return DEFAULT_JURISDICTION;
  };

  const getCourtLocation = (id) => {
    switch (id) {
      case "uk":
        return "London";
      case "us":
      default:
        return "Washington, DC";
    }
  };

  const jurisdiction = getJurisdiction(countryId);
  const courtLocation = getCourtLocation(countryId);

  useEffect(() => {
    // Fetch the markdown content
    fetch(apiTermsContent)
      .then((response) => response.text())
      .then((text) => {
        // Replace placeholders with actual values
        const processedText = text
          .replace(/{{jurisdiction}}/g, jurisdiction)
          .replace(/{{courtLocation}}/g, courtLocation)
          .replace(/{{privacyLink}}/g, `/${countryId}/privacy`);
        setMarkdown(processedText);
      });
  }, [countryId, jurisdiction, courtLocation]);

  return (
    <>
      <Helmet>
        <title>API Terms of Service | PolicyEngine</title>
      </Helmet>
      <Header />
      <Container
        style={{
          paddingTop: 100,
          paddingLeft: !mobile && 100,
          paddingRight: !mobile && 100,
          paddingBottom: 100,
          maxWidth: 900,
        }}
      >
        <ReactMarkdown
          components={{
            // Custom rendering for links to handle internal routing
            a: ({ href, children }) => {
              if (href && href.startsWith("/")) {
                return <Link to={href}>{children}</Link>;
              }
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </Container>
      <Footer />
    </>
  );
}