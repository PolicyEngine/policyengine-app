import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Button as AntButton, Tooltip } from "antd";
import fixedStyles from "../style";

export default function CollapseButton(props) {
  const {
    onClick,
    isCollapsed,
    style
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
        // Extra padding at bottom to 
        // avoid collision with scrollbar
        padding: "10px 20px 20px 20px", 
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px",
        backgroundColor: fixedStyles.colors.LIGHT_GRAY,
        ...style
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