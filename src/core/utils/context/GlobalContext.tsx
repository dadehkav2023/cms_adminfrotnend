import React, { useState, useContext } from "react";

type globalContextType = {
  // first step
  registerInfo: [number, React.Dispatch<React.SetStateAction<number>>];
  phoneNumber: [string, React.Dispatch<React.SetStateAction<string>>];
  mainLocationId: [number, React.Dispatch<React.SetStateAction<number>>];
};

// type useGlobalStateType = "registerInfo"; //second step

const globalContext = React.createContext<globalContextType | null>(null);

export const useGlobalState = () => {
  const pc = useContext(globalContext);
  if (pc === null) {
    throw new Error("useGlobalState Must be inside of Provider");
  }
  return pc;
};

const GlobalContext: React.FC = ({ children }) => {
  const [registerInfo, setResgisterInfo] = useState(0); // third step
  const [phoneNumber, setPhoneNumber] = useState(""); // third step
  const [mainLocationId, setMainLocationId] = useState<number>(2); // third step

  return (
    <>
      <globalContext.Provider
        value={{
          registerInfo: [registerInfo, setResgisterInfo], // Fourth step
          phoneNumber: [phoneNumber, setPhoneNumber],
          mainLocationId: [mainLocationId, setMainLocationId],
        }}
      >
        {children}
      </globalContext.Provider>
    </>
  );
};

export { GlobalContext };
