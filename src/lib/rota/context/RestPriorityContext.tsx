"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type RestPriorityContextType = {
  restPriority: number;
  setRestPriority: (value: number) => void;
};

const RestPriorityContext = createContext<RestPriorityContextType | undefined>(
  undefined
);

export const RestPriorityProvider = ({ children }: { children: ReactNode }) => {
  const [restPriority, setRestPriorityState] = useState<number>(() => 3);
  console.log(restPriority);
  useEffect(() => {
    const stored = localStorage.getItem("rest-priority");
    if (stored !== null) {
      setRestPriorityState(Number(stored));
    }
  }, []);

  const setRestPriority = (value: number) => {
    setRestPriorityState(value);
    localStorage.setItem("rest-priority", value.toString());
  };

  return (
    <RestPriorityContext.Provider value={{ restPriority, setRestPriority }}>
      {children}
    </RestPriorityContext.Provider>
  );
};

export const useRestPriorityContext = (): RestPriorityContextType => {
  const ctx = useContext(RestPriorityContext);
  if (!ctx) {
    throw new Error(
      "useRestPriorityContext must be used within a RestPriorityProvider"
    );
  }
  return ctx;
};
