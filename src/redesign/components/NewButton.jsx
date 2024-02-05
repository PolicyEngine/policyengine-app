import React from "react";
import { Button } from "antd";
import colors from "../style/colors";

const buttonStyles = {
  primary: {
    hoverBackgroundColor: colors.TEAL_PRESSED,
    standardBackgroundColor: colors.TEAL_ACCENT,
  },
  secondary: {
    hoverBackgroundColor: colors.BLUE_PRESSED,
    standardBackgroundColor: colors.BLUE_LIGHT,
  },
  disabled: {
    hoverBackgroundColor: colors.BLUE_PRESSED,
    standardBackgroundColor: colors.BLUE_LIGHT,
  },
  default: {
    hoverBackgroundColor: colors.TEAL_PRESSED,
    standardBackgroundColor: colors.TEAL_ACCENT,
  },
};

const NewButton = (props) => {
  return (
    <Button
      className="new-btn"
      style={{
        display: "flex",
        borderRadius: "0",
        backgroundColor: colors.TEAL_ACCENT,
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = colors.TEAL_PRESSED) &&
        (e.currentTarget.style.borderColor = colors.TEAL_PRESSED)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = colors.TEAL_ACCENT) &&
        (e.currentTarget.style.borderColor = colors.TEAL_ACCENT)
      }
    >
      🎉New Button
    </Button>
  );
};

export default NewButton;
