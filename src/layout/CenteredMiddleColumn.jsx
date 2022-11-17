export default function CenteredMiddleColumn(props) {
  const { title, description, children } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20%",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>{title}</h1>
      {description && <h4>{description}</h4>}
      {children}
    </div>
  );
}
