import useMobile from "../layout/Responsive";

export default function CenteredMiddleColumn(props) {
  const { title, description, marginTop, marginBottom, children } = props;
  const mobile = useMobile();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: mobile ? "20%" : "15%",
      }}
    >
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <h3 style={{ fontFamily: "Roboto Serif", fontWeight: 400 }}>{title}</h3>

        {description && (
          <>
            <p
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: "grey",
                fontFamily: "Roboto",
                display: "inline-block",
              }}
            >
              Description
            </p>
            <p style={{ fontFamily: "Roboto Serif" }}>{description}</p>
          </>
        )}
        <div style={{ marginTop: 20 }} />
        {children}
      </div>
    </div>
  );
}
