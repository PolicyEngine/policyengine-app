import { motion } from "framer-motion";
import useMobile from "../layout/Responsive";

export default function InputField(props) {
  const { placeholder, onChange, padding, width } = props;
  const mobile = useMobile();
  const onInput = (e) => {
    if (e.target.value !== null) {
      let value = e.target.value;
      e.target.value = null;
      onChange(value);
    }
  }
  return (
      <motion.input
        // On iOS, should show a keyboard with a blue "Go" button
        style={{
          padding: padding || 20,
          marginLeft: padding || 20,
          marginRight: padding || 20,
          width: width || 200,
        }}
        type="tel" inputmode='decimal'
        whileFocus={{ scale: 1.05 }}
        onBlur={onInput}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            let value = e.target.value;
            onChange(value);
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
