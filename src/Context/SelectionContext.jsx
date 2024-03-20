import React, { createContext, useState } from "react";

export const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <SelectionContext.Provider
      value={{ selected, setSelected, selectedIndex, setSelectedIndex }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
