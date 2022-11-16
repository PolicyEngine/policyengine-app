export default function ResultsPanel() {
  return (
    <div
      style={{
        backgroundColor: style.colors.WHITE,
        color: style.colors.BLACK,
        padding: 20,
      }}
    >
      {props.children}
    </div>
  );
}
