import style from "../style";

export default function RadioButton(props) {
  const { keys, labels, onChange, value, defaultValue } = props;

  // Items are displayed in gray boxes horizontally

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {keys.map((key, index) => {
        const label = labels[index];
        const checked = value === key;
        const defaultChecked = defaultValue === key;
        return (
          <div
            key={key}
            style={{
              backgroundColor: checked
                ? style.colors.BLUE
                : style.colors.MEDIUM_DARK_GRAY,
              color: checked ? style.colors.WHITE : style.colors.BLACK,
              cursor: "pointer",
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderWidth: 1,
              borderStyle: "solid",
              marginRight: 5,
              borderRadius: 25,
              borderColor: style.colors.MEDIUM_DARK_GRAY,
            }}
            onClick={() => onChange(key)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
