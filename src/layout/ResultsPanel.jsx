export default function ResultsPanel(props) {
  return (
    <div style={{ padding: 20, paddingLeft: 40 }}>
      <h1>{props.title}</h1>
      <h5>{props.description}</h5>
      <div style={{ paddingTop: 30 }}>{props.children}</div>
    </div>
  );
}
