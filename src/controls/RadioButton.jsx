import { Radio } from 'antd';
import style from "../style";

export default function RadioButton(props) {
  const { keys, labels, onChange, value } = props;

  // Create options array for Radio.Group
  const options = keys.map((key, index) => ({
    label: labels[index],
    value: key,
    style: {
      fontSize: '16px', 
       
      backgroundColor: index === 0 ? style.colors.BLUE : style.colors.MEDIUM_DARK_GRAY, 
      color: index === 0 ? style.colors.WHITE : style.colors.DARK_GRAY, 
    },
  }));

  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={value || keys[0]}
      optionType="button"
      buttonStyle="solid"
      size='large'
    />
  );
}