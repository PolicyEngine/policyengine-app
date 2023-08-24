import style from "../style";
import useDisplayCategory from "./useDisplayCategory";
import EmphasisedLink from "./EmphasisedLink";

export default function ShowcaseItem({ title, description, linkTitle, link, image, borderColor }) {
    const displayCategory = useDisplayCategory();
    
    return <div
      style={{
        display: "flex",
        flexDirection: displayCategory === "desktop" ? "row" : "column",
        marginTop: 50,
        paddingBottom: 50,
        borderBottom: `1px solid ${borderColor || style.colors.WHITE}`,
      }}>
        <div style={{
          minWidth: displayCategory === "desktop" ? 300 : "100%",
          maxWidth: displayCategory === "desktop" ? 300 : "100%",
          paddingRight: displayCategory === "desktop" ? 100 : 0,
          marginBottom: displayCategory !== "desktop" ? 20 : 0,
        }}>
        <h2>{title}</h2>
        </div>
        <div style={{
          paddingRight: displayCategory === "desktop" ? 50 : 0,
          marginBottom: displayCategory !== "desktop" ? 20 : 0,
        }}>
        <p>{description}</p>
        <EmphasisedLink link={link} text={linkTitle} />
        </div>
        <img src={image} width={
            displayCategory === "desktop" ? 400 : "100%"
        }/>
      </div>
  }