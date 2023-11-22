import Button from "./Button";
import { useNavigate } from "react-router-dom";

/**
 * React component used for linking to internal and external pages; must be 
 * utilized within the context of a react-router component
 * @param {Object} props 
 * @param {String} props.link The link the button should redirect to; external links must include http:// or https://
 * @param {String} [props.text] The text to be displayed on the LinkButton
 * @param {String|Number} [props.width] The desired width of the button; Number-type sets width to px
 * @param {String} [props.type] A defined type for the button from among "primary", "secondary", or "default"
 * @param {Object} [props.size] A JSX styling object; overrides props.width when passed
 * @param {String|Number} [props.height] The desired height of the button; Number-type sets height to px
 * @param {String} [props.hoverStart="left"] The desired direction from which the button's hover effect starts
 * @param {String} [props.backgroundColor] Desired background color, overriding default styling
 * @param {String} [props.activeBackgroundColor] Desired background color when button is hovered and ":active"
 * @returns {import("react").ReactComponentElement}
 */
export default function LinkButton(props) {
  const {
    text,
    width,
    size,
    type,
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
      size={size}
      type={type}
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