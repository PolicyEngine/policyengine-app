import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";

function Post(props) {
  const navigate = useNavigate();
  const PolicyEngine = useContext(PolicyEngineContext);
  return <div style={{
      backgroundColor: "#F2F2F2",
      padding: 15,
      display: "flex",
      cursor: "pointer",
  }} onClick={() => navigate(PolicyEngine.getCountryLink(`/blog/${props.metadata.url}`))}>
      <div style={{
          marginTop: "auto",
      }}>
          <h2>{props.metadata.title}</h2>
          <h4>{props.metadata.description}</h4>
      </div>
  </div>
}

export default function HomePage() {
  // Split out the first blog post from the rest
  const PolicyEngine = useContext(PolicyEngineContext);
  const [firstPost, ...restPosts] = PolicyEngine.countryRelevantBlogPosts;
  return (
    <Container>
      <Row style={{height: 400, padding: 10}}>
        <Post metadata={firstPost}/>
      </Row>
      <Row>
        {restPosts.map((post) => (
          <Col key={post.url} style={{padding: 10}} md={4}><Post metadata={post} /></Col>
        ))}
      </Row>
    </Container>
  );
}