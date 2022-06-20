import React, { createContext, useContext, useState } from 'react';

export const LookContext = createContext();

export function LookProvider({ children }) {
  const [atualLook, setAtualLook] = useState({});

  const chosenLook = (look) => {
    setAtualLook(look);
  };

  return (
    <LookContext.Provider value={{ atualLook, chosenLook }}>
      {children}
    </LookContext.Provider>
  );
}

export const useLook = () => {
  return useContext(LookContext);
};
