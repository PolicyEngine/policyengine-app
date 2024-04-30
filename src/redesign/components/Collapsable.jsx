import { Collapse } from "antd";
import style_ from "../../style";

export default function Collapsable({ label, child, style, defaultOpen }) {
  return (
    <Collapse
      defaultActiveKey={defaultOpen ? ["child"] : []}
      ghost
      style={{
        ...style,
        backgroundColor: style_.colors.LIGHT_GRAY,
        fontFamily: "Roboto",
      }}
      items={[
        {
          key: "child",
          label: <span style={{ color: "grey" }}>{label}</span>,
          children: child,
        },
      ]}
    />
  );
}
