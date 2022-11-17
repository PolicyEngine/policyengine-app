import { LoadingOutlined } from "@ant-design/icons";

export default function LoadingCentered() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingOutlined />
    </div>
  );
}
