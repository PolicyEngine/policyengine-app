import { useState } from "react";
import { capitalize } from "../lang/format";
import style from "../style";
import { motion } from "framer-motion";
import { Tag } from "antd";

function MenuItem(props) {
  const { name, label, selected, onSelect, disabled } = props;

  const betaBadge = <Tag color={style.colors.TEAL_ACCENT}>BETA</Tag>;
  const isBeta = label.includes(" (experimental)");
  const adjustedLabel = isBeta ? label.slice(0, -14) : label;

  return (
    <motion.div
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
      }}
      initial={{ backgroundColor: "transparent" }}
      animate={{
        backgroundColor: selected === name ? "white" : "transparent",
      }}
      onClick={disabled ? () => undefined : () => onSelect(name)}
      whileHover={!disabled && { backgroundColor: "white" }}
      transition={{ duration: 0.001 }}
    >
      <p
        style={{
          fontSize: 16,
          color: disabled && style.colors.DARK_GRAY,
          fontFamily: "Roboto Serif",
          margin: 5,
        }}
      >
        {selected === name && (
          <span
            style={{
              marginRight: 10,
              fontFamily: "Roboto Serif",
              color: disabled ? style.colors.DARK_GRAY : style.colors.BLACK,
              textShadow: "0 0 .2px #000",
              paddingBottom: 2,
              fontWeight: 500,
            }}
          >
            {adjustedLabel}
          </span>
        )}
        {selected === name ? "" : adjustedLabel || name.split(".").pop()}
        {isBeta && betaBadge}
      </p>
    </motion.div>
  );
}

function MenuItemGroup(props) {
  const { name, label, selected, children, onSelect, disabled } = props;
  const betaBadge = <Tag color={style.colors.TEAL_ACCENT}>BETA</Tag>;
  const isBeta = label.includes(" (experimental)");
  const adjustedLabel = isBeta ? label.slice(0, -14) : label;

  const [expanded, setExpanded] = useState(selected.includes(name));
  const [selectedWhenExpandedLastToggled, setSelectedWhenExpandedLastToggled] =
    useState(selected);

  const toggleExpanded = () => {
    //onSelect(name);
    setExpanded(!expanded);
  };

  if (selectedWhenExpandedLastToggled !== selected) {
    setExpanded(selected.includes(name));
    setSelectedWhenExpandedLastToggled(selected);
  }

  const showExpanded = expanded;

  let expandedChildren = [];

  if (showExpanded) {
    for (let child of children) {
      if (child.name.includes("pycache")) {
        continue;
      }
      if (child.children) {
        expandedChildren.push(
          <MenuItemGroup
            disabled={disabled}
            key={child.name}
            name={child.name}
            label={capitalize(child.label)}
            selected={selected}
            onSelect={onSelect}
          >
            {child.children}
          </MenuItemGroup>,
        );
      } else {
        expandedChildren.push(
          <MenuItem
            disabled={disabled}
            key={child.name}
            name={child.name}
            label={capitalize(child.label)}
            selected={selected}
            onSelect={onSelect}
          />,
        );
      }
    }
  }

  const expandedComponentSpace = (
    <div
      style={{
        paddingLeft: 15,
        overflow: "hidden",
      }}
    >
      {expandedChildren}
    </div>
  );

  return (
    <div>
      <motion.div
        onClick={disabled ? () => undefined : toggleExpanded}
        style={{
          color: disabled ? style.colors.DARK_GRAY : style.colors.BLACK,
          paddingTop: 5,
          paddingBottom: 5,
          cursor: disabled ? "not-allowed" : "pointer",
          paddingLeft: 10,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
        whileHover={!disabled && { backgroundColor: "white" }}
      >
        <p style={{ fontSize: 16, fontFamily: "Roboto Serif", margin: 5 }}>
          {selected === name && (
            <span
              style={{
                marginRight: 10,
                color: disabled ? style.colors.DARK_GRAY : style.colors.BLACK,
                fontFamily: "Roboto Serif",
                textShadow: "0 0 .2px #000",
              }}
            >
              {adjustedLabel}
            </span>
          )}
          {selected === name ? "" : adjustedLabel || name.split(".").pop()}
          {isBeta && betaBadge}
        </p>
      </motion.div>
      {expandedComponentSpace}
    </div>
  );
}

export default function Menu(props) {
  const { tree, selected, onSelect } = props;

  let menuItems = [];
  for (const item of tree) {
    if (item.children) {
      menuItems.push(
        <MenuItemGroup
          disabled={item.disabled}
          key={item.name}
          name={item.name}
          label={capitalize(item.label)}
          selected={selected || ""}
          onSelect={onSelect}
        >
          {item.children}
        </MenuItemGroup>,
      );
    } else {
      menuItems.push(
        <MenuItem
          disabled={item.disabled}
          key={item.name}
          name={item.name}
          label={item.label}
          selected={selected || ""}
          onSelect={onSelect}
        />,
      );
    }
  }
  return menuItems;
}
