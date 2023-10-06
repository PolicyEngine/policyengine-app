import React from "react";

export const PovertyChangeContext = React.createContext({
  minChange: 0,
  maxChange: 0,
  addChanges: () => {},
});
export const PovertyChangeProvider = ({ children }) => {
  const [minChange, setMinChange] = React.useState(0);
  const [maxChange, setMaxChange] = React.useState(0);

  const addChanges = (changes) => {
    setMinChange((currentMin) => Math.min(currentMin, ...changes));
    setMaxChange((currentMax) => Math.max(currentMax, ...changes));
  };

  return (
    <PovertyChangeContext.Provider value={{ minChange, maxChange, addChanges }}>
      {children}
    </PovertyChangeContext.Provider>
  );
};
