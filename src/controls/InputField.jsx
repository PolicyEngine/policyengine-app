import { motion } from "framer-motion";

export default function InputField(props) {
  const { placeholder, onChange, padding, width } = props;
  return (
    <form action="" id="form">
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
        onBlur={(e) => {
          let value = e.target.value;
          e.target.value = null;
          onChange(value);
        }}
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
      <input type="submit" style={{ visibility: "hidden", position: "absolute" }} value="" />
    </form>
  );
}
