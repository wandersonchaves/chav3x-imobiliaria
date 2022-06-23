import React, { createContext, useContext, useState } from 'react';

export const HouseContext = createContext();

export function HouseProvider({ children }) {
  const [atualHouse, setAtualHouse] = useState({});

  const chosenHouse = (house) => {
    setAtualHouse(house);
  };

  return (
    <HouseContext.Provider value={{ atualHouse, chosenHouse }}>
      {children}
    </HouseContext.Provider>
  );
}

export const useHouse = () => {
  return useContext(HouseContext);
};
