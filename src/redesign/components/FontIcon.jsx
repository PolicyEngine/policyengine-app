

export default function FontIcon({ name, size }) {
    return <span
    className="material-symbols-outlined"
    style={{ marginLeft: 10, fontSize: 15 | size,
      verticalAlign: "middle",
    }}
  >
    {name}
  </span>
}