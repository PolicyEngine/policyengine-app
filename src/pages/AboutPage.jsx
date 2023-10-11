import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import useMobile from "../layout/Responsive";

import MaxGhenis from "../images/authors/max-ghenis.jpg";
import NikhilWoodruff from "../images/authors/nikhil-woodruff.jpg";

export default function AboutPage() {
  const mobile = useMobile();
  document.title = "About | PolicyEngine";
  const nikhilBio = (
    <Col xs={12} md={8} style={{ display: "flex", alignItems: "center" }}>
      <p>
        <b>Nikhil Woodruff</b> is the co-founder and CTO of PolicyEngine. He is
        also the UK Research Director at the UBI Center, a think tank
        researching universal basic income policies, and was previously a data
        scientist at Caspian, where he worked in improving anti-money laundering
        investigations. Nikhil has a bachelor&apos;s degree in Computer Science
        from the University of Durham.
      </p>
    </Col>
  );
  const nikhilImage = (
    <Col
      xs={12}
      md={4}
      style={{
        display: "flex",
        justifyContent: mobile ? "center" : "right",
        alignItems: "center",
        paddingBottom: 25,
        paddingTop: 25,
      }}
    >
      <img
        src={NikhilWoodruff}
        alt="Nikhil Woodruff"
        style={{
          width: 150,
          height: 150,
          borderRadius: 100,
          objectFit: "cover",
        }}
      />
    </Col>
  );
  const contents = (
    <>
      <h1>About</h1>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h3 style={{ paddingBottom: 25 }}>Leadership</h3>
        <Row>
          <Col
            xs={12}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 25,
              paddingTop: 25,
            }}
          >
            <img
              src={MaxGhenis}
              alt="Max Ghenis"
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                objectFit: "cover",
              }}
            />
          </Col>
          <Col xs={12} md={8} style={{ display: "flex", alignItems: "center" }}>
            <p>
              <b>Max Ghenis</b> is the co-founder and CEO of PolicyEngine. He is
              also the founder and president of the UBI Center, a think tank
              researching universal basic income policies, and was previously a
              data scientist at Google. Max has a master&apos;s degree in Data,
              Economics, and Development Policy from MIT and a bachelor&apos;s
              degree in operations research from UC Berkeley.
            </p>
          </Col>
        </Row>
        <Row>
          {mobile ? nikhilImage : nikhilBio}
          {mobile ? nikhilBio : nikhilImage}
        </Row>
      </div>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h3>PSL Foundation Board of Directors</h3>
        <p>
          PolicyEngine is fiscally sponsored by the PSL Foundation, a US
          nonprofit with the following directors:
        </p>
        <p>
          <b>Jason DeBacker</b>, president of the PSL Foundation and associate
          professor of economics at the University of South Carolina&apos;s
          Darla Moore School of Business.
        </p>
        <p>
          <b>Linda Gibbs</b>, principal at Bloomberg Associates. Linda
          previously served New York City as the Deputy Mayor for Health and
          Human Services and Commissioner of the Department of Homeless
          Services.
        </p>
        <p>
          <b>Glenn Hubbard</b>, Dean Emeritus and Professor of Finance and
          Economics at Columbia University and nonresident senior fellow at the
          American Enterprise Institute. Glenn previously served as Chairman of
          the Council of Economic Advisers and Deputy Assistant Treasury
          Secretary.
        </p>
      </div>
    </>
  );
  if (mobile) {
    return <Container style={{ padding: 20 }}>{contents}</Container>;
  } else {
    return (
      <Container style={{ maxWidth: 800, paddingTop: 40 }} className="serif">
        {contents}
      </Container>
    );
  }
}
