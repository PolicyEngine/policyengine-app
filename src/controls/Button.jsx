import style from "../style";


export default function Button(props) {
    const { text, onClick } = props;

    return <div
        style={{
            backgroundColor: style.colors.BLUE,
            color: style.colors.WHITE,
            padding: 10,
            borderRadius: 25,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 16,
            ...props.style,
        }}
        onClick={onClick}
    >
        {text}
    </div>
}