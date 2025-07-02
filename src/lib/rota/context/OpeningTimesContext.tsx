"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { generateHoursArray } from "@/lib/rota/utils";
import { Weekday } from "@/lib/rota/rota";

interface OpeningTimesContextType {
  openingTimes: string[][];
  setOpeningTimes: ({
    day,
    times,
  }: {
    day: Weekday;
    times: [string, string];
  }) => void;
}

const OpeningTimesContext = createContext<OpeningTimesContextType | undefined>(
  undefined
);

export const OpeningTimesProvider: React.FC<{
  children: React.ReactNode;
  intialWorkLoad: string[][];
}> = ({ children, intialWorkLoad }) => {
  const [openingTimes, setOpeningTimesState] = useState(intialWorkLoad);

  const setOpeningTimes = useCallback(
    ({ day, times }: { day: Weekday; times: [string, string] }) => {
      setOpeningTimesState((prevTimes) => {
        const newTimes = [...prevTimes]; // ✅ Clone the array (shallow copy)
        newTimes[day] = generateHoursArray({
          open: times[0],
          close: times[1],
        });

        return newTimes;
      });
    },
    []
  );

  return (
    <OpeningTimesContext.Provider value={{ openingTimes, setOpeningTimes }}>
      {children}
    </OpeningTimesContext.Provider>
  );
};

export const useOpeningTimesContext = (): OpeningTimesContextType => {
  const context = useContext(OpeningTimesContext);
  if (!context) {
    throw new Error(
      "useOpeningTimesContext must be used within OpeningTimesProvider"
    );
  }
  return context;
};
