import style from "../../style";

export default function ResultsPanel(props) {
  return (
    <div style={{ padding: 20, paddingLeft: 40 }}>
      <h4 onClick={props.onBack}> &#8592; Back</h4>
      <h1 style={{ marginTop: 50 }}>{props.title}</h1>
      <p>{props.description}</p>
      <div style={{ paddingTop: 30 }}>{props.children}</div>
    </div>
  );
}
