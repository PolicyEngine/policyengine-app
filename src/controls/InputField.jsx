import { motion } from "framer-motion";
import useMobile from "../layout/Responsive";
import style from "../style";

export default function InputField(props) {
  const { placeholder, onChange, padding, width, type, inputmode } = props;
  const mobile = useMobile();
  const onInput = (e) => {
    let value = e.target.value;
    e.target.value = null;
    if (value !== "") {
      onChange(value);
    }
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
      inputmode={inputmode || "decimal"}
      whileFocus={{ scale: 1.05 }}
      onBlur={onInput}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          let value = e.target.value;
          if (value !== "") {
            onChange(value);
          }
          e.target.value = null;
          if (!mobile) {
            e.target.blur();
          }
        }
      }}
      placeholder={placeholder}
    />
  );
}
