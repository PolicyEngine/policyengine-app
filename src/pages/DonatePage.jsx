import { Container } from "react-bootstrap";
import useMobile from "../layout/Responsive";

export default function DonatePage(props) {
  const contents = (
    <>
      <h1>Donate</h1>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <p>
          You can support PolicyEngine's work by donating through our fiscal
          sponsor, the <a href="https://psl-foundation.org">PSL Foundation</a>
        </p>
        <p>
          <a href="https://opencollective.com/psl-foundation">
            Donate by credit card here
          </a>{" "}
          or{" "}
          <a href="jason.debacker@psl-foundation.org">
            email the PSL Foundation for other options
          </a>
          . Please <a href="hello@policyengine.org">email us</a> or the PSL
          Foundation when you've donated to ensure your gift is directed to
          PolicyEngine.
        </p>
        <p>Your donation is tax-deductible in the US.</p>
      </div>
    </>
  );
  const mobile = useMobile();
  if (mobile) {
    return <Container style={{ padding: 20 }}>{contents}</Container>;
  } else {
    return (
      <Container
        className="serif"
        style={{
          maxWidth: 800,
          paddingTop: 40,
          height: `calc(100vh - 140px)`,
          overflowY: "scroll",
        }}
      >
        {contents}
      </Container>
    );
  }
}
