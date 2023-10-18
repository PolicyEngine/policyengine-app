import style from "../style";
import useDisplayCategory from "./useDisplayCategory";
import EmphasisedLink from "./EmphasisedLink";

export default function ShowcaseItem({
  title,
  description,
  linkTitle,
  link,
  image,
  altText,
  borderColor,
  color,
}) {
  const displayCategory = useDisplayCategory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: displayCategory === "desktop" ? "row" : "column",
        marginTop: 50,
        paddingBottom: 50,
        borderBottom: `1px solid ${borderColor || style.colors.WHITE}`,
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: displayCategory === "desktop" ? 300 : "100%",
          maxWidth: displayCategory === "desktop" ? 300 : "100%",
          paddingRight: displayCategory === "desktop" ? 100 : 0,
          marginBottom: displayCategory !== "desktop" ? 20 : 0,
        }}
      >
        <h2 style={{ color: color }}>{title}</h2>
      </div>
      <div
        style={{
          paddingRight: displayCategory === "desktop" ? 50 : 0,
          marginBottom: displayCategory !== "desktop" ? 20 : 0,
        }}
      >
        <p>{description}</p>
        <EmphasisedLink url={link} text={linkTitle} />
      </div>
      <img
        src={image}
        width={displayCategory === "desktop" ? 400 : "100%"}
        height="100%"
        style={{
          objectFit: "contain",
          // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.9)",
        }}
        alt={altText}
      />
    </div>
  );
}
