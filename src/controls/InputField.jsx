import { motion } from "framer-motion";

export default function InputField(props) {
  const { placeholder, onChange, padding, width } = props;
  return (
    <motion.input
      style={{
        padding: padding || 20,
        marginLeft: padding || 20,
        marginRight: padding || 20,
        width: width || 200,
      }}
      whileFocus={{ scale: 1.05 }}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.target.blur();
          let value = e.target.value;
          e.target.value = null;
          onChange(value);
        }
      }}
      placeholder={placeholder}
    />
  );
}
