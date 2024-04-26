import { LoadingOutlined } from "@ant-design/icons";

export default function Spinner(props) {
  const { size, color, style } = props;
  return <LoadingOutlined size={size} style={{ color: color, ...style }} />;
}
