import { Container } from "react-bootstrap";
import useMobile from "../layout/Responsive";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TACPage() {
  const mobile = useMobile();
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
        <h1>Terms of Service</h1>
        <h4>Introduction</h4>
        <p>
          1. These Terms of Service (&quot;Terms&quot;) govern your access to
          and use of the PolicyEngine website and simulation tools (the
          &quot;Service&quot;) provided by PolicyEngine. By accessing or using
          the Service, you agree to be bound by these Terms.
        </p>
        <h4>Use of the Service</h4>
        <p>
          2.1 The Service is provided for informational and educational purposes
          only. PolicyEngine does not guarantee the accuracy, completeness, or
          reliability of the information or analysis provided through the
          Service.
        </p>
        <p>
          2.2 You are responsible for any activity that occurs through your use
          of the Service.
        </p>
        <p>
          2.3 You agree not to use the Service for any unlawful or prohibited
          purpose.
        </p>
        <h4>Intellectual Property</h4>
        <p>
          3.1 The Service, including all content, software, and other materials,
          is owned by PolicyEngine and protected by intellectual property laws.
        </p>
        <p>
          3.2 PolicyEngine grants you a limited, revocable, non-exclusive,
          non-transferable license to access and use the Service for your
          personal, non-commercial use.
        </p>
        <h4>User Submissions</h4>
        <p>
          4.1 By submitting content or data to the Service, you grant
          PolicyEngine a worldwide, non-exclusive, royalty-free license to use,
          reproduce, modify, and distribute such content or data in connection
          with the Service.
        </p>
        <h4>Third-Party Websites and Services</h4>
        <p>
          5.1 The Service may contain links to third-party websites or services.
          PolicyEngine is not responsible for the content or practices of these
          third-party websites or services.
        </p>
        <h4>Disclaimer of Warranties</h4>
        <p>
          6.1 The Service is provided &quot;as is&quot; without warranties of
          any kind, express or implied, including but not limited to warranties
          of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
        <h4>Limitation of Liability</h4>
        <p>
          7.1 In no event shall PolicyEngine be liable for any indirect,
          incidental, special, or consequential damages arising out of or in
          connection with the use or inability to use the Service.
        </p>
        <h4>Termination</h4>
        <p>
          8.1 PolicyEngine reserves the right to terminate or suspend your
          access to the Service at any time, with or without cause or notice.
        </p>
        <h4>Governing Law</h4>
        <p>
          9.1 These Terms shall be governed by and construed in accordance with
          the laws of the United States.
        </p>
        <h4>Changes to the Terms</h4>
        <p>
          10.1 PolicyEngine may update this privacy policy at any time in order
          to reflect, for example, changes to our practices or for other
          operational legal or regulatory reasons. PolicyEngine will update this
          page with a changelog, and the full history of changes is be available
          on our{" "}
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
