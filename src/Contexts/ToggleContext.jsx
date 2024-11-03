import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export default function ToggleProvider({ children }) {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const toggleView = () => {
    setIsSignedUp((prev) => !prev);
  };

  return (
    <ToggleContext.Provider value={{ isSignedUp, toggleView }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggle() {
  return useContext(ToggleContext);
}
