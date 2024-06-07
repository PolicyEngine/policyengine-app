import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import fixedStyles from "../style";

export default function CollapseButton(props) {
  const { onClick, isCollapsed, style, title } = props;

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
        gap: "12px",
        // Extra padding at bottom to
        // avoid collision with scrollbar
        // padding: "10px 0px 0px 20px",
        paddingLeft: "20px",
        borderStyle: "solid",
        borderImage: `linear-gradient(to right, 
          ${fixedStyles.colors.LIGHT_GRAY} 0px, 
          ${fixedStyles.colors.LIGHT_GRAY} 16px, 
          ${fixedStyles.colors.MEDIUM_DARK_GRAY} 16px, 
          ${fixedStyles.colors.MEDIUM_DARK_GRAY} calc(100% - 16px), 
          ${fixedStyles.colors.LIGHT_GRAY} calc(100% - 16px), 
          ${fixedStyles.colors.LIGHT_GRAY} 100%) 100% 0 0 0/3px 0 0 0 stretch`,
        backgroundColor: fixedStyles.colors.LIGHT_GRAY,
        borderImageWidth: "1px",
        borderWidth: "1px",
        height: "100%",
        ...style,
      }}
    >
      <Tooltip
        title={`${isCollapsed ? "Maximize" : "Minimize"} panel`}
        placement="right"
      >
        {isCollapsed ? (
          <DoubleRightOutlined
            onClick={clickHandler}
            style={{
              fontSize: "12px",
              color: fixedStyles.colors.DARK_GRAY,
            }}
          />
        ) : (
          <DoubleLeftOutlined
            onClick={clickHandler}
            style={{
              fontSize: "12px",
              color: fixedStyles.colors.DARK_GRAY,
            }}
          />
        )}
      </Tooltip>
      <p
        style={{
          margin: "0",
          // paddingTop: "30px",
          fontSize: "12px",
          color: fixedStyles.colors.DARK_GRAY,
        }}
      >
        {title}
      </p>
    </div>
  );
}
