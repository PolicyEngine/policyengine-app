import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Button as AntButton, Tooltip } from "antd";
import style from "../style";

export default function CollapseButton(props) {
  const {
    onClick,
    isCollapsed
  } = props;

  function clickHandler() {
    if (onClick instanceof Function) {
      onClick();
    }
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0px 20px",
      }}
    >
      <Tooltip
        title={`${isCollapsed ? "Maximize" : "Minimize"} panel`}
        placement="right"
      >
        {
          isCollapsed ? (
            <DoubleRightOutlined
              onClick={clickHandler}
              style={{
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.88)"
              }}
            />
          ) : (
            <DoubleLeftOutlined
              onClick={clickHandler}
              style={{
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.88)"
              }}
            />
          )
        }
      </Tooltip>
    </div>
  )

}