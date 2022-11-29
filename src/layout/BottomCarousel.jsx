import NavigationButton from "../controls/NavigationButton";
import style from "../style";
import useMobile from "./Responsive";


export default function BottomCarousel(props) {
    const { selected, options } = props;
    const mobile = useMobile();
    const currentIndex = options.map(option => option.name).indexOf(selected);
    const current = options[currentIndex] || {};
    const previous = options[currentIndex - 1] || {};
    const next = options[currentIndex + 1] || {};

    // Show the previous to the left, the current in the middle, and the next to the right

    return <div style={{
        position: !mobile && "absolute",
        bottom: !mobile && 0,
        display: "flex",
        height: 80,
        zIndex: 100,
        left: !mobile && "25%",
        width: !mobile && "50%",
        alignItems: "center",
        backgroundColor: style.colors.WHITE,
        padding: 5,
    }}>
        <div style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            padding: 10,
        }}>
        {previous.label && (
            <NavigationButton
                focus={previous.name}
                text={"← " + previous.label}
                style={{ width: mobile ? 100 : 200, fontSize: mobile ? 10 : 16 }}
            />
        )}
        </div>
        <div style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            padding: 10,
        }}>
            {current.label}
        </div>
        <div style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            padding: 10,
        }}>
            {next.label && (
                <NavigationButton
                    focus={next.name}
                    text={next.label + " →"}
                    style={{width: mobile ? 100 : 200, fontSize: mobile ? 10 : 16 }}
                />
            )}
        </div>
    </div>
}