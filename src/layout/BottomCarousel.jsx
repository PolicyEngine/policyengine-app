

export default function BottomCarousel(props) {
    const { selected, options } = props;

    return <div style={{
        display: "flex",
    }}>
        {options.map((option) => {
            return <div key={option.value} style={{
                width: 100,
                height: 100,
                backgroundColor: selected === option.value ? "blue" : "red",
            }}>{option.label}</div>
        })}
    </div>
}