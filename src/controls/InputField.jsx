import { motion } from "framer-motion";

export default function InputField(props) {
  const { placeholder, onChange } = props;
  return (
    <motion.input
      pattern="[0-9]*"
      style={{
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        width: 200,
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
