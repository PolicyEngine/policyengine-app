import Markdown from "markdown-to-jsx";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PolicyEngineContext from "../countries/PolicyEngine";


export default function PostPage(props) {
    const [post, setPost] = useState("");
    const PolicyEngine = useContext(PolicyEngineContext);

    useEffect(() => {
        import(`../blog/${props.post.markdown}`).then((post) => {
            fetch(post.default)
                .then((response) => response.text())
                .then((text) => {
                    setPost(text);
                }
            );
        })});
    
    return <Container style={{paddingTop: 20}}>
        <Markdown>{post}</Markdown>
    </Container>
    }