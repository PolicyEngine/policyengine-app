import { useNavigate, useSearchParams } from "react-router-dom";
import gtag from "../api/analytics";
import { copySearchParams } from "../api/call";
import Button from "./Button";
import ArrowButton from "./ArrowButton";

export default function SearchParamNavButton(props) {
  const {
    text,
    focus,
    target,
    style,
    type,
    onClick,
    direction,
    moreOnClick,
    testId,
  } = props;
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

      // This is a workaround to add extra onClick functionality;
      // this should be redone in the future
      if (moreOnClick instanceof Function) {
        moreOnClick();
      }
    });

  if (direction) {
    return (
      <ArrowButton
        testId={testId}
        direction={direction}
        type={type}
        style={{ ...style }}
        onClick={handleClick}
      />
    );
  }

  return (
    <Button
      testId={testId}
      type={type}
      text={text}
      style={{ ...style }}
      onClick={handleClick}
    />
  );
}
