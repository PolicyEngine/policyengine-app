import { Col, Container, Row } from "react-bootstrap";
import TableOfContents from "./TableOfContents";


export default function Page(props) {

    return <Container>
        <Row style={{paddingTop: 70, paddingBottom: 30}}>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
        </Row>
        <Row>
            <Col md={3} style={{position: "fixed"}}>
                {props.leftContent}
            </Col>
            <Col md={6} style={{marginLeft: "25%"}}>
                {props.children}
            </Col>
            <Col md={3}>
                {props.rightContent}
            </Col>
        </Row>
    </Container>
}