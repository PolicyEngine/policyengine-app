import style from "../style";
import useDisplayCategory from "../hooks/useDisplayCategory";
import EmphasisedLink from "./EmphasisedLink";
import { FileImageOutlined } from "@ant-design/icons";

export default function ShowcaseItem({
  title,
  description,
  linkTitle,
  link,
  image,
  altText,
  borderColor,
  color,
  imageIsMissing,
  imageShrinkPercentage,
}) {
  const displayCategory = useDisplayCategory();

  const imageWidth = imageShrinkPercentage
    ? `${imageShrinkPercentage}%`
    : displayCategory === "desktop"
      ? 400
      : "100%";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: displayCategory === "desktop" ? "row" : "column",
        marginTop: 50,
        paddingBottom: 50,
        borderBottom: `1px solid ${borderColor || style.colors.WHITE}`,
        alignItems: "center",
        justifyContent:
          displayCategory === "desktop" ? "space-between" : "flex-start", // Conditional justifyContent
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
      {imageIsMissing ? (
        <div
          style={{
            height: "300px",
            width: "100%",
            display: "flex",
            position: "relative",
            objectFit: "contain",
            border: "1px solid grey",
          }}
        >
          <FileImageOutlined
            style={{
              fontSize: "32px",
              position: "absolute",
              top: "250px",
              right: "20px",
            }}
          />
        </div>
      ) : (
        <img
          src={image}
          width={imageWidth}
          height="100%"
          style={{
            objectFit: "contain",
          }}
          alt={altText}
        />
      )}
    </div>
  );
}
