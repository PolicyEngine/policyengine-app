export default function ResultsPanel(props) {
  const { style } = props;
  return (
    <div style={{ padding: 20, paddingLeft: 40, height: "100%", ...style }}>
      <h1>{props.title}</h1>
      <h5>{props.description}</h5>
      <div style={{ paddingTop: 30 }}>{props.children}</div>
    </div>
  );
}
