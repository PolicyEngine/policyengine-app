export function HoverBox({
  hoverBackgroundColor,
  direction,
  children,
  size,
  onClick,
  style,
  link,
  ...rest
}) {
  let topStart, leftStart, topEnd, leftEnd, spread;

  const boxSize = size || "200px";

  spread = "0px";

  if (direction === "top") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = boxSize;
    leftEnd = "0px";
  } else if (direction === "bottom") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = `-${boxSize}`;
    leftEnd = "0px";
  } else if (direction === "left") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = "0px";
    leftEnd = boxSize;
  } else if (direction === "right") {
    topStart = "0px";
    leftStart = "0px";
    topEnd = "0px";
    leftEnd = `-${boxSize}`;
  }

  const containerStyle = {
    transition: "box-shadow 0.1s ease-out",
    position: "relative",
    overflow: "hidden", // Hide the box-shadow overflow
    boxShadow: `inset ${leftStart} ${topStart} ${spread} ${hoverBackgroundColor}`,
  };

  const hoverStyle = {
    boxShadow: `inset ${leftEnd} ${topEnd} 0 ${spread} ${hoverBackgroundColor}`, // This will create the effect
  };

  // Should use box-shadow to have a different background fill up from the bottom on hover
  return (
    <div
      {...rest}
      style={{ ...containerStyle, ...(style || {}) }}
      onMouseOver={(e) =>
        (e.currentTarget.style.boxShadow = hoverStyle.boxShadow)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow = containerStyle.boxShadow)
      }
      onClick={
        onClick ||
        (link &&
          (() => {
            window.open(link, "_self");
          }))
      }
    >
      {children}
    </div>
  );
}
