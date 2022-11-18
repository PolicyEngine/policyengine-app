import { LoadingOutlined } from "@ant-design/icons";

export default function Spinner(props) {
  const { size } = props;
  return <LoadingOutlined size={size} />;
}
