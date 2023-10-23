import { useNavigate, useSearchParams } from "react-router-dom";
import gtag from "../api/analytics";
import { copySearchParams } from "../api/call";
import Button from "./Button";

export default function SearchParamNavButton(props) {
  const { text, focus, target, style, primary, disabled, onClick } = props;
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

  return (
    <Button
      primary={primary}
      disabled={disabled}
      text={text}
      style={{ ...style, margin: 10 }}
      onClick={handleClick}
    />
  );
}
