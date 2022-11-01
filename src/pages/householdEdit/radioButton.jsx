import { DARK_GRAY, LIGHT_GRAY } from "../../style";

export default function RadioButton(props) {
  const labels = props.labels;
  const values = props.keys;
  const selected = props.selected;
  const setSelected = props.onSelect;

  const firstLabel = labels[0];
  const firstValue = values[0];
  const middleLabels = labels.slice(1, -1);
  const middleValues = values.slice(1, -1);
  const lastLabel = labels[labels.length - 1];
  const lastValue = values[values.length - 1];

  return (
    <div style={{ display: "flex", alignItems: "center", paddingBottom: 15 }}>
      <h4 style={{ margin: 0 }}>{props.title}</h4>
      <div
        style={{
          marginLeft: 20,
          padding: 15,
          backgroundColor: selected === firstValue ? DARK_GRAY : LIGHT_GRAY,
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          borderRightColor: DARK_GRAY,
          borderRightWidth: 2,
          borderRightStyle: "solid",
          cursor: "pointer",
        }}
        onClick={() => setSelected(firstValue)}
      >
        {firstLabel}
      </div>
      {middleLabels.map((label, index) => {
        const value = middleValues[index];
        return (
          <div
            style={{
              padding: 15,
              backgroundColor: selected === value ? DARK_GRAY : LIGHT_GRAY,
              borderRightColor: DARK_GRAY,
              borderRightWidth: 2,
              borderRightStyle: "solid",
              cursor: "pointer",
            }}
            key={label}
            onClick={() => setSelected(value)}
          >
            {label}
          </div>
        );
      })}
      <div
        style={{
          padding: 15,
          backgroundColor: selected === lastValue ? DARK_GRAY : LIGHT_GRAY,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          cursor: "pointer",
        }}
        onClick={() => setSelected(lastValue)}
      >
        {lastLabel}
      </div>
    </div>
  );
}
