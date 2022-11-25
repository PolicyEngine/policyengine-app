export default function CenteredMiddleColumn(props) {
  const { title, description, marginTop, marginBottom, children } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: marginTop || "20%",
      }}
    >
      <h1 style={{ marginBottom: marginBottom || 20 }}>{title}</h1>
      {description && (
        <h4 style={{ paddingLeft: 100, paddingRight: 100 }}>{description}</h4>
      )}
      {children}
    </div>
  );
}
