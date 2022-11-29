import Markdown from "markdown-to-jsx";

export default function MarkdownPage(props) {
  const { title, children } = props;
  return (
    <div>
      <h1>{title}</h1>
      <Markdown>{children}</Markdown>
    </div>
  );
}
