export default function FontIcon({ name, size, style }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        marginLeft: 10,
        fontSize: 15 | size,
        verticalAlign: "middle",
        ...style,
      }}
    >
      {name}
    </span>
  );
}
