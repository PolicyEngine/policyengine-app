import useMobile from "../layout/Responsive";

export default function CenteredMiddleColumn(props) {
  const {
    title,
    description,
    children,
    marginTop,
    descriptionLabel = true,
    style,
  } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: marginTop ? marginTop : "10%",
        paddingLeft: 50,
        paddingRight: 50,
        ...style,
      }}
    >
      <h3 style={{ fontFamily: "Roboto Serif", fontWeight: 400 }}>{title}</h3>

      {description && (
        <>
          {descriptionLabel && (
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
          )}
          <p style={{ fontFamily: "Roboto Serif" }}>{description}</p>
        </>
      )}
      {children}
    </div>
  );
}
