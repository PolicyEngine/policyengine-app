import FontIcon from "./FontIcon";

export default function EmphasisedLink({ text, url, size }) {
    const fontSize = 15 | size;
    return <a style={{
        textTransform: "uppercase",
        fontFamily: "Roboto",
        fontWeight: 500,
        letterSpacing: 2.4,
        fontSize,
    }} href={url}>
        {text}
        <FontIcon name="arrow_forward" size={fontSize} />
    </a>
}