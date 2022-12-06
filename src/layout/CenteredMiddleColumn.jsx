import useMobile from "../layout/Responsive";

export default function CenteredMiddleColumn(props) {
  const { title, description, marginTop, marginBottom, children } = props;
  const mobile = useMobile();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: marginTop || "20%",
        justifyContent: "center",
      }}
    >
      <h1 style={{ marginBottom: marginBottom || 20, textAlign: "center" }}>
        {title}
      </h1>
      {description && (
        <h4
          style={{
            paddingLeft: mobile ? 20 : 100,
            paddingRight: mobile ? 20 : 100,
            textAlign: "center",
          }}
        >
          {description}
        </h4>
      )}
      {children}
    </div>
  );
}
