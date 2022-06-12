import React, { createContext, useEffect, useState } from 'react';

export const LookContext = createContext();

export const LookProvider = ({ children }) => {
  const [chosenLook, setChosenLook] = useState({});

  useEffect(() => {
    const lookLocal = window.localStorage.getItem('look');

    if (lookLocal) {
      setChosenLook(JSON.parse(lookLocal));
    }
  }, []);

  const chooseLook = (look) => {
    setChosenLook(() => ({ [look.id]: look }));
  };

  const finishLook = (look) => {
    setChosenLook((old) => {
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
    <LookContext.Provider value={{ chosenLook, chooseLook, finishLook }}>
      {children}
    </LookContext.Provider>
  );
};
