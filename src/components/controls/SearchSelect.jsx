import { useState } from "react";

export default function SearchSelect(props) {
  const { names, labels, value, onChange, width } = props;
  const valueLabel = labels[names.indexOf(value)];
  // Should be a large gray text field which expands to show a list of options
  // below as the user types, and which can be clicked to select an option.
  const [searchTerm, setSearchTerm] = useState(valueLabel);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div>
      <input
        type="text"
        placeholder={labels[names.indexOf(value)]}
        value={searchTerm}
        style={{
          width: width || 300,
          padding: 10,
          border: "none",
          outline: "none",
        }}
        onKeyUp={(e) => {
          setSearchTerm(e.target.value);
        }}
        onFocus={() => setIsTyping(true)}
      />
      <div
        style={{
          height: 200,
          overflow: "auto",
          width: 300,
          padding: 10,
        }}
      >
        {isTyping &&
          names
            .filter((name) =>
              labels[names.indexOf(name)]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((name) => (
              <div
                key={name}
                style={{
                  padding: 5,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsTyping(false);
                  setSearchTerm(labels[names.indexOf(name)]);
                  onChange(name);
                }}
              >
                {labels[names.indexOf(name)]}
              </div>
            ))}
      </div>
    </div>
  );
}
