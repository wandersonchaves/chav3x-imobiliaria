import React, { createContext, useEffect, useState } from 'react';

export const LookContext = createContext();

export const LookProvider = ({ children }) => {
  const [atualLook, setAtualLook] = useState({});

  useEffect(() => {
    const lookLocal = window.localStorage.getItem('look');

    if (lookLocal) {
      setAtualLook(JSON.parse(lookLocal));
    }
  }, []);

  const chosenLook = (look) => {
    setAtualLook(() => ({ [look.id]: look }));
  };

  const finishLook = (look) => {
    setAtualLook((old) => {
      let quantity = 0;
      if (old[look.id]) {
        quantity = old[look.id].quantity;
      }
      const newLook = {
        ...old,
        [look.id]: { quantity: quantity + 1, look },
      };
      window.localStorage.setItem('look', JSON.stringify(newLook));
      return newLook;
    });
  };

  return (
    <LookContext.Provider value={{ atualLook, chosenLook, finishLook }}>
      {children}
    </LookContext.Provider>
  );
};
