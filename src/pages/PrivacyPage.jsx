import { Container } from "react-bootstrap";
import useMobile from "../layout/Responsive";
import { Helmet } from "react-helmet";
import Header from "../redesign/components/Header";
import Footer from "../layout/Footer";

export default function PrivacyPage() {
  const mobile = useMobile();
  return (
    <>
      <Helmet>
        <title>Privacy | PolicyEngine</title>
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
        <h1>Privacy</h1>
        <h3>How does PolicyEngine use my data?</h3>
        <p>
          PolicyEngine does not store personally identifiable information. We{" "}
          <b>do</b> use Google Analytics to track site usage statistics using
          cookies. You can opt-out of this tracking by clicking the
          &quot;Necessary cookies only&quot; button on the cookie consent banner
          at the bottom of the page, in line with the General Data Protection
          Regulation.
        </p>
        <p>
          Sometimes external websites embed PolicyEngine-developed applications
          on their own pages as interactives. In these cases, the external
          website may on the same page collect data about your use of the
          PolicyEngine application: see their own privacy policy for details.
        </p>
        <p>
          When you create a household or policy reform, PolicyEngine stores an
          anonymous ID for it in the page URL: this is to enable you to refresh
          the page or share a link directly to a specific result without having
          to enter details again.
        </p>
        <h3>Contributing to PolicyEngine</h3>
        <p>
          Many people contribute to the development of PolicyEngine models and
          applications in our open-source repositories on GitHub, and we display
          a running feed of GitHub activity on our homepage to highlight these
          contributions. By agreeing to the{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">
            GitHub privacy policy
          </a>
          , contributors agree that their GitHub username can be used for this
          purpose.
        </p>
        <h3>Changes to this privacy policy</h3>
        <p>
          We may update this privacy policy at any time in order to reflect, for
          example, changes to our practices or for other operational legal or
          regulatory reasons. We will update this page with a changelog, and the
          full history of changes is be available on our{" "}
          <a href="https://github.com/policyengine/policyengine-app">
            GitHub repository
          </a>
          .
        </p>
      </Container>
      <Footer />
    </>
  );
}
