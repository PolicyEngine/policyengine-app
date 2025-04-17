import { useSearchParams } from "react-router-dom";
import Menu from "./Menu";

export default function StackedMenu(props) {
  const { firstTree, secondTree, selected, onSelect } = props;

  const [searchParams] = useSearchParams();
  const isMultiYear =
    searchParams.get("simYears") &&
    !Number.isNaN(searchParams.get("simYears")) &&
    searchParams.get("simYears") > 1;

  const isOnOutput =
    window.location.search.includes("focus=policyOutput") ||
    window.location.search.includes("focus=householdOutput");

  const isOnMultiYearOutput = isOnOutput && isMultiYear;

  let result;
  if (isOnMultiYearOutput) {
    result = (
      <Menu
        tree={secondTree}
        selected={selected}
        onSelect={onSelect}
        isMultiYear
      />
    );
  } else if (isOnOutput) {
    result = <Menu tree={secondTree} selected={selected} onSelect={onSelect} />;
  } else {
    result = <Menu tree={firstTree} selected={selected} onSelect={onSelect} />;
  }

  return <div style={{ padding: 20, height: "100%" }}>{result}</div>;
}
