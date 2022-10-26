import Markdown from "markdown-to-jsx";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";


export default function PostPage(props) {
    const [post, setPost] = useState("");

    useEffect(() => {
        import(`../../blog/${props.post.markdown}`).then((post) => {
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