import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import PolicyEngineContext from "../countries/PolicyEngine";
import { useEffect } from "react";

function Post(props) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if(props.metadata.image) {
      import(`../images/${props.metadata.image}`).then((image) => {
        setImageUrl(image.default);
      });
    }
  });
  return <div style={{
      backgroundColor: "#F2F2F2",
      backgroundImage: `url(${imageUrl})`,
      padding: 0,
      display: "flex",
      cursor: "pointer",
      height: props.height || 300,
  }} onClick={() => navigate(props.metadata.url)}>
      <div style={{
          marginTop: "auto",
          backgroundColor: "#F2F2F2",
          width: "100%",
          padding: 15,
      }}>
          <h2>{props.metadata.title}</h2>
          <h4>{props.metadata.description}</h4>
      </div>
  </div>
}

function CustomPost(props) {
  const navigate = useNavigate();
  const PolicyEngine = useContext(PolicyEngineContext);
  return <div style={{
      backgroundColor: "#F2F2F2",
      padding: 15,
      display: "flex",
      cursor: "pointer",
      height: 300,
  }} onClick={() => navigate(PolicyEngine.getCountryLink(props.url))}>
      <div style={{
          marginTop: "auto",
      }}>
          <h2>{props.title}</h2>
          <h5>{props.description}</h5>
      </div>
  </div>
}

export default function HomePage() {
  // Split out the first blog post from the rest
  const PolicyEngine = useContext(PolicyEngineContext);
  const [firstPost, ...restPosts] = PolicyEngine.countryRelevantBlogPosts;
  return (
    <Container>
      <Row style={{minHeight: 300, padding: 10}}>
        <Col md={3}><CustomPost title="Enter your household details" description="Describe and save your household's attributes." url="/household/edit" /></Col>
        <Col md={3}><CustomPost title="Calculate your household income" description="See your taxes and benefits, under current law or a policy reform." url="/household" /></Col>
        <Col md={3}><CustomPost title="Design tax-benefit policy reforms" description="Build and save reforms to tax and benefit rules." url="/policy" /></Col>
        <Col md={3}><CustomPost title="Simulate economic impacts" description="Compute the impact of policy reforms on the country" url="/economy" /></Col>
      </Row>
      <Row style={{padding: 10}}>
        <Col md={9}>
          <Row style={{padding: 20}}>
            <Col md={9}><h2>Research</h2></Col>
          </Row>
          <Row>
            <Col md={12} style={{minHeight: 300, padding: 10, marginBottom: 10}}>
              <Post metadata={firstPost} height={400} />
            </Col>
            {restPosts.map((post) => (
              <Col key={post.url} style={{height: 300, padding: 10, marginTop: 10, marginBottom: 10}} md={4}><Post metadata={post} /></Col>
            ))}
          </Row>
        </Col>
        <Col md={3} style={{padding: 10, height: 300}}>
          <CustomPost
            title="We compute the impact of public policy."
            description="Some longer description about PolicyEngine that's sufficient for new users stumbling across the site."
            url="/"
          />
        </Col>
      </Row>
    </Container>
  );
}