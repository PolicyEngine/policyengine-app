import Menu from "./Menu";

export default function StackedMenu(props) {
  const { firstTree, secondTree, selected, onSelect } = props;

  // onOutput == focus=policyOutput.?
  const isOnOutput =
    window.location.search.includes("focus=policyOutput") ||
    window.location.search.includes("focus=householdOutput");
  let result;
  if (isOnOutput) {
    result = <Menu tree={secondTree} selected={selected} onSelect={onSelect} />;
  } else {
    result = <Menu tree={firstTree} selected={selected} onSelect={onSelect} />;
  }

  return (
    <div style={{ overflow: "scroll", padding: 20, height: "100%" }}>{result}</div>
  );
}
