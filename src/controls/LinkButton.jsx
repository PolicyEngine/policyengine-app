import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function LinkButton(props) {
  const {
    text,
    width,
    primary,
    secondary,
    disabled,
    size,
    height,
    hoverStart,
    backgroundColor,
    activeBackgroundColor,
    link,
  } = props;

  const navigate = useNavigate();
  const isExternalLink = checkIfExternalLink(link);

  function handleNavigate() {
    if (isExternalLink) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  }

  return (
    <Button
      text={text}
      width={width}
      primary={primary}
      secondary={secondary}
      disabled={disabled}
      size={size}
      height={height}
      hoverStart={hoverStart}
      backgroundColor={backgroundColor}
      activeBackgroundColor={activeBackgroundColor}
      onClick={handleNavigate}
    />
  );

}

function checkIfExternalLink(link) {
  if (link.slice(0, 4) === "http") {
    return true;
  }
  return false;
}