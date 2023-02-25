import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { capitalize } from "../api/language";
import style from "../style";

function MenuItem(props) {
  const { name, label, selected, onSelect } = props;

  // If selected, display a Unicode right arrow to the left of the label

  return (
    <motion.div
      style={{
        cursor: "pointer",
        paddingTop: 5,
        paddingBottom: 5,
      }}
      onClick={() => onSelect(name)}
    >
      <motion.h5
        style={{ fontSize: 18 }}
        initial={{ x: 0 }}
        whileHover={{ color: "black", fontWeight: "bold" }}
      >
        {selected === name && (
          <span
            style={{
              marginRight: 10,
              color: "black",
              fontWeight: "bold",
              textShadow: "0 0 .2px #000",
            }}
          >
            {label}
          </span>
        )}
        {selected === name ? "" : label || name.split(".").pop()}
      </motion.h5>
    </motion.div>
  );
}

function MenuItemGroup(props) {
  const { name, label, selected, children, onSelect } = props;
  // By default, expand the group if the selected item is in the group.
  // The user can then collapse the group if they want, but it should
  // re-open if the selected item becomes a child of the group, and
  // close if the selected item moves out of the group.

  const [expanded, setExpanded] = useState(selected.includes(name));
  const [selectedWhenExpandedLastToggled, setSelectedWhenExpandedLastToggled] =
    useState(selected);

  const toggleExpanded = () => {
    onSelect(name);
    setExpanded(!expanded);
  };

  if (selectedWhenExpandedLastToggled !== selected) {
    setExpanded(selected.includes(name));
    setSelectedWhenExpandedLastToggled(selected);
  }

  const showExpanded = expanded;

  let expandedChildren = [];

  if (showExpanded) {
    // Sort children by their index property
    for (let child of children) {
      if (child.name.includes("pycache")) {
        continue;
      }
      if (child.children) {
        expandedChildren.push(
          <MenuItemGroup
            key={child.name}
            name={child.name}
            label={capitalize(child.label)}
            selected={selected}
            children={child.children}
            onSelect={onSelect}
          />
        );
      } else {
        expandedChildren.push(
          <MenuItem
            key={child.name}
            name={child.name}
            label={capitalize(child.label)}
            selected={selected}
            onSelect={onSelect}
          />
        );
      }
    }
  }

  const expandedComponentSpace = (
    <motion.div
      style={{
        paddingLeft: 15,
        overflow: "hidden",
      }}
      animate={
        showExpanded
          ? { height: "auto", opacity: 1 }
          : { height: 0, opacity: 0 }
      }
      transition={{
        duration: 0.25,
      }}
    >
      <AnimatePresence delay={showExpanded ? 0 : 0.5}>
        {expandedChildren}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <motion.div
      style={{
        color: style.colors.BLACK,
        paddingTop: 5,
        paddingBottom: 5,
        cursor: "pointer",
      }}
    >
      <motion.h5
        onClick={toggleExpanded}
        initial={{ x: 0 }}
        whileHover={{ color: "black", fontWeight: "bold" }}
        style={{ fontSize: 18 }}
      >
        {selected === name && (
          <span
            style={{
              marginRight: 10,
              color: "black",
              fontWeight: "bold",
              textShadow: "0 0 .2px #000",
            }}
          >
            {label}
          </span>
        )}
        {selected === name ? "" : label || name.split(".").pop()}
      </motion.h5>
      {expandedComponentSpace}
    </motion.div>
  );
}

export default function Menu(props) {
  const { tree, selected, onSelect } = props;

  // tree is a nested object with the following structure:
  // [{  name: name, label: label, children: {...} }]
  // Child keys must include the keys of their parent.

  let menuItems = [];
  for (const item of tree) {
    if (item.children) {
      menuItems.push(
        <MenuItemGroup
          key={item.name}
          name={item.name}
          label={item.label}
          selected={selected || ""}
          children={item.children}
          onSelect={onSelect}
        />
      );
    } else {
      menuItems.push(
        <MenuItem
          key={item.name}
          name={item.name}
          label={item.label}
          selected={selected || ""}
          onSelect={onSelect}
        />
      );
    }
  }
  return menuItems;
}
