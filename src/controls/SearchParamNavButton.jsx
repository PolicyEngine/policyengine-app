import { useNavigate, useSearchParams } from "react-router-dom";
import gtag from "../api/analytics";
import { copySearchParams } from "../api/call";
import Button from "./Button";
import ArrowButton from "./ArrowButton";

export default function SearchParamNavButton(props) {
  const { text, focus, target, style, type, onClick, direction } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick =
    onClick ||
    (() => {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("focus", focus);
      if (target) {
        navigate(target + "?" + newSearch);
        gtag("event", "navigate", {
          event_category: "link",
          event_label: target,
        });
      } else {
        setSearchParams(newSearch);
        gtag("event", "navigate", {
          event_category: "focus",
          event_label: focus,
        });
      }
    });

  if (direction) {
    return (
      <ArrowButton
        direction={direction}
        type={type}
        style={{ ...style }}
        onClick={handleClick}
      />
    );
  }

  return (
    <Button
      type={type}
      text={text}
      style={{ ...style }}
      onClick={handleClick}
    />
  );
}
