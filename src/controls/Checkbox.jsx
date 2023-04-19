export default function Checkbox(props) {
  const {label, checked, onChange} = props;
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
