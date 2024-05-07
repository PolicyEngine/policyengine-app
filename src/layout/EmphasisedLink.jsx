import FontIcon from "./FontIcon";

export default function EmphasisedLink({ text, url, size, isStretched }) {
  const fontSize = size || 15;
  return (
    <a
      style={{
        textTransform: "uppercase",
        fontFamily: "Roboto",
        fontWeight: 500,
        letterSpacing: 2.4,
        fontSize,
      }}
      href={url}
      className={`${isStretched ? "stretched-link" : ""}`}
    >
      {text}
      <FontIcon name="arrow_forward" size={fontSize} />
    </a>
  );
}
