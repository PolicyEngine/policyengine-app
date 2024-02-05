import React from "react";
import { Button } from "antd";
import colors from "../style/colors";

const NewButton = (props) => {
  return (
    <Button
      className="new-btn"
      style={{
        display: "flex",
        borderRadius: "0",
        backgroundColor: colors.TEAL_ACCENT,
      }}
    >
      🎉New Button
    </Button>
  );
};

export default NewButton;
