import { motion } from "framer-motion";
import useMobile from "../layout/Responsive";
import style from "../style";
import { useState } from "react";

export default function InputField(props) {
  const {
    onChange,
    padding,
    width,
    type,
    inputmode,
    pattern,
    value,
    placeholder,
  } = props;
  const [inputValue, setInputValue] = useState(value ? value : "");
  const mobile = useMobile();
  const re = /^[0-9\b]*[.]?[0-9\b]*?$/;
  const onInput = (e) => {
    let value = e.target.value === "" ? placeholder : e.target.value;
    onChange(value);
  };
  return (
    <motion.input
      // On iOS, should show a keyboard with a blue "Go" button
      style={{
        padding: padding || 20,
        marginLeft: padding || 20,
        marginRight: padding || 20,
        width: width || 200,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: style.colors.GRAY,
        marginTop: mobile ? 0 : -10,
      }}
      type={type || "tel"}
      inputMode={inputmode || "decimal"}
      whileFocus={{ scale: 1.05 }}
      onBlur={onInput}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          let value = e.target.value;
          if (value !== "") {
            onChange(value);
          }
          if (!mobile) {
            e.target.blur();
          }
        }
      }}
      onChange={(e) => {
        let { value } = e.target;

        // evaluating percentage input
        if (pattern === "%") {
          if (!value.includes("%") && value !== "") {
            e.target.value += "%";
          } else if (value !== "") {
            let val = value.slice(0, e.target.value.length - 1);
            e.target.value = val + "%";
          }
          e.target.setSelectionRange(
            e.target.value.length - 1,
            e.target.value.length - 1,
          );
        } else if (pattern === "number") {
          if (value !== "" && !re.test(value)) {
            const val = value.replace(/[^\d.]+/g, "");
            e.target.value = val.includes(".") ? parseFloat(val) : val;
          }
        }
        setInputValue(e.target.value);
      }}
      value={inputValue}
      placeholder={placeholder}
    />
  );
}
