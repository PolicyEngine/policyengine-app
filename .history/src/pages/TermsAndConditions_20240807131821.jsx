import { Container } from "react-bootstrap";
import useMobile from "../layout/Responsive";
import { Helmet } from "react-helmet";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useCountryId from "../hooks/useCountryId";

export default function TACPage() {
  const mobile = useMobile();
  const countryId = useCountryId() || "us"; // Default to "us" if countryId is null

  const termsContent = {
    us: (
      <>
        <h1>Terms of Service - US</h1>
        <h4>Introduction</h4>
        <p>
          1. These Terms of Service (&quot;Terms&quot;) govern your access to
          and use of the PolicyEngine website and simulation tools (the
          &quot;Service&quot;) provided by PolicyEngine. By accessing or using
          the Service, you agree to be bound by these Terms.
        </p>
        {/* Add other sections for US terms */}
      </>
    ),
    uk: (
      <>
        <h1>Terms of Service - UK</h1>
        <h4>Introduction</h4>
        <p>
          1. These Terms of Service (&quot;Terms&quot;) govern your access to
          and use of the PolicyEngine website and simulation tools (the
          &quot;Service&quot;) provided by PolicyEngine. By accessing or using
          the Service, you agree to be bound by these Terms.
        </p>
        {/* Add other sections for UK terms */}
      </>
    ),
    // Add other countries' terms content similarly
  };

  return (
    <>
      <Helmet>
        <title>Terms and Conditions | PolicyEngine</title>
      </Helmet>
      <Header />
      <Container
        style={{
          paddingTop: 100,
          paddingLeft: !mobile && 100,
          paddingRight: !mobile && 100,
          paddingBottom: 100,
        }}
      >
        {termsContent[countryId] || termsContent["us"]}
      </Container>
      <Footer />
    </>
  );
}
