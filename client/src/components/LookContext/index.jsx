import React, { createContext, useState } from 'react';

export const LookContext = createContext();

export const LookProvider = ({ children }) => {
  const [chosenLook, setChosenLook] = useState({});
  const chooseLook = (look) => {
    setChosenLook((old) => ({ ...old, [look.id]: look }));
  };

  return (
    <LookContext.Provider value={{ chosenLook, chooseLook }}>
      {children}
    </LookContext.Provider>
  );
};
