import style from "../style";

export default function Divider(props) {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        borderBottom: `1px solid ${style.colors.DARK_GRAY}`,
      }}
    />
  );
}
