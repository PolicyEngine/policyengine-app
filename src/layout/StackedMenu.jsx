import { useEffect, useRef } from "react";
import Divider from "./Divider";
import Menu from "./Menu";

export default function StackedMenu(props) {
  const { firstTree, secondTree, selected, onSelect } = props;
  const firstMenuRef = useRef(null);
  const secondMenuRef = useRef(null);

  useEffect(() => {
    if (firstMenuRef.current) {
      firstMenuRef.current.scrollTop = 0;
    }
    if (secondMenuRef.current) {
      secondMenuRef.current.scrollTop = 0;
    }
  }, [selected]);

  return (
    <div style={{ height: "80vh" }}>
      <div
        ref={firstMenuRef}
        style={{ overflow: "scroll", height: "50%", padding: 20 }}
      >
        <Menu tree={firstTree} selected={selected} onSelect={onSelect} />
      </div>
      <Divider />
      <div
        ref={secondMenuRef}
        style={{ overflow: "scroll", height: "50%", padding: 20 }}
      >
        <Menu tree={secondTree} selected={selected} onSelect={onSelect} />
      </div>
    </div>
  );
}
