import style from "../style";

export default function TextBox(props) {
  const { placeholder, title, width } = props;

  return (
    <div>
      <h6
        style={{
          color: style.colors.WHITE,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {title}
      </h6>
      <input
        placeholder={placeholder}
        style={{
          border: "none",
          borderBottom: `1px solid ${style.colors.WHITE}`,
          backgroundColor: style.colors.LIGHT_GRAY,
          color: style.colors.DARK_GRAY,
          width: width || "100%",
          height: 50,
          fontSize: 20,
          fontWeight: 300,
          padding: 10,
        }}
      />
    </div>
  );
}
