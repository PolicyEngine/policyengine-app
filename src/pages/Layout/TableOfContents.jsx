

export default function TableOfContents(props) {
    const tree = props.tree;

    // Each node in the tree has the following properties:
    // * title: the title of the node
    // * key: the key of the node (also the ID of the element it refers to)
    // * children: an array of child nodes

    let contents = [];
    const getNode = (node, level) => {
        let childNodes = [];
        if (node.children) {
            childNodes = node.children.map(child => getNode(child, level + 1));
        }
        return (
            <div key={node.key} style={{paddingLeft: level * 30}}>
                <h6 onClick={() => {
                    const element = document.getElementById(node.key);
                    // Scroll to 50px above the element
                    const y = element.getBoundingClientRect().top + window.scrollY - 50;
                    window.scrollTo({top: y, behavior: "smooth"});
                }} style={{
                    cursor: "pointer",
                }}>{node.title}</h6>
                {childNodes}
            </div>
        );
    }

    for (let node of tree) {
        contents.push(getNode(node, 0));
    }

    return <>
        <h4 style={{paddingBottom: 10}}>On this page</h4>
        {contents}
        <h6 style={{paddingTop: 10, cursor: "pointer"}} onClick={() => {
            window.scrollTo({top: 0, behavior: "smooth"});
        }}>Back to top</h6>
    </>
}