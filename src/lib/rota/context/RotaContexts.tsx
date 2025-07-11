"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Week, Weekday, Shift, DayShiftsMap, EmployeeRole } from "../rota";
import { INITIAL_WEEK } from "../constants";
import {
  serializeWeek,
  deserializeWeek,
  sortDayGroupedByRole,
  calculateShiftHours,
  clearShiftAssignments,
} from "../utils";
import { usePathname } from "next/navigation";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import AlertModal from "@/ui/Other/AlertModal";

interface RotaState {
  week: Week;
  status: "saved" | "modified";
}

type WithoutRole = Omit<Shift, "employeeRole">;

type Action =
  | { type: "ADD_API_SHIFTS"; week: Week }
  | { type: "ADD_SHIFT"; day: Weekday; shift: Shift }
  | { type: "UPDATE_SHIFT"; day: Weekday; shift: Shift }
  | { type: "DELETE_SHIFT"; day: Weekday; shiftId: string }
  | { type: "REPLACE_DAY"; day: Weekday; shifts: DayShiftsMap }
  | { type: "LOAD_WEEK"; week: Week };

interface RotaContextType {
  week: Week;
  addApiShifs: (assignedWeeklyShifts: Week) => void;
  addShift: (day: Weekday, shift: WithoutRole) => void;
  updateShift: (day: Weekday, shift: Shift) => void;
  deleteShift: (day: Weekday, shiftId: string) => void;
  replaceDay: (day: Weekday, shifts: DayShiftsMap) => void;
  loadTemplate: (overrideWeek?: Week) => void;
  saveToTemplate: () => void;
}

const rotaReducer = (state: RotaState, action: Action): RotaState => {
  const nextWeek = new Map(state.week);

  switch (action.type) {
    case "ADD_API_SHIFTS": {
      const apiShifts = new Map(
        Array.from(action.week.entries()).map(([dayIndex, dayMap]) => [
          dayIndex,
          new Map(sortDayGroupedByRole(dayMap)),
        ])
      );
      return { week: apiShifts, status: "modified" };
    }
    case "ADD_SHIFT": {
      const dayShifts = new Map(nextWeek.get(action.day));
      dayShifts.set(action.shift.id, action.shift);
      nextWeek.set(action.day, sortDayGroupedByRole(dayShifts));
      return { week: nextWeek, status: "modified" };
    }
    case "UPDATE_SHIFT": {
      const dayShifts = new Map(nextWeek.get(action.day));
      dayShifts.set(action.shift.id, action.shift);
      nextWeek.set(action.day, sortDayGroupedByRole(dayShifts));
      return { week: nextWeek, status: "modified" };
    }
    case "DELETE_SHIFT": {
      const dayShifts = new Map(nextWeek.get(action.day));
      dayShifts.delete(action.shiftId);
      nextWeek.set(action.day, dayShifts);
      return { week: nextWeek, status: "modified" };
    }
    case "REPLACE_DAY": {
      nextWeek.set(action.day, action.shifts);
      return { week: nextWeek, status: "modified" };
    }
    case "LOAD_WEEK":
      return { week: action.week, status: "modified" };
    default:
      return state;
  }
};

const RotaContext = createContext<RotaContextType | undefined>(undefined);

export const RotaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { resetHoursToEmployees } = useEmployeeContext();
  const [state, dispatch] = useReducer(rotaReducer, {
    week: INITIAL_WEEK,
    status: "saved",
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // modal state
  const pathname = usePathname();

  useEffect(() => {}, [state.week, state.status, resetHoursToEmployees]);

  const addApiShifs = useCallback((assignedWeeklyShifts: Week) => {
    dispatch({ type: "ADD_API_SHIFTS", week: assignedWeeklyShifts });
  }, []);

  const addShift = useCallback(
    (day: Weekday, shift: WithoutRole) => {
      const roleFromPath = pathname
        .split("/")[2]
        ?.toUpperCase() as EmployeeRole;
      const completeShift: Shift = { ...shift, employeeRole: roleFromPath };
      const isOverLegalWorkingHours = calculateShiftHours(completeShift) > 13;
      if (!isOverLegalWorkingHours) {
        dispatch({ type: "ADD_SHIFT", day, shift: completeShift });
      }
      if (isOverLegalWorkingHours) {
        setAlertMessage("Shift hours exceed 13 hours");
      }
    },
    [pathname]
  );

  const updateShift = useCallback((day: Weekday, shift: Shift) => {
    const isOverLegalWorkingHours = calculateShiftHours(shift) > 13;
    if (!isOverLegalWorkingHours) {
      dispatch({ type: "UPDATE_SHIFT", day, shift });
    }
    if (isOverLegalWorkingHours) {
      setAlertMessage("Shift hours exceed 13 hours");
    }
  }, []);

  const deleteShift = useCallback(
    (day: Weekday, shiftId: string) =>
      dispatch({ type: "DELETE_SHIFT", day, shiftId }),
    []
  );

  const replaceDay = useCallback(
    (day: Weekday, shifts: DayShiftsMap) =>
      dispatch({ type: "REPLACE_DAY", day, shifts }),
    []
  );

  const loadTemplate = useCallback(
    (overrideWeek?: Week) => {
      let weekToLoad: Week;

      if (overrideWeek) {
        // Use the provided week directly
        weekToLoad = overrideWeek;
      } else {
        // Otherwise fall back to stored template
        const raw = localStorage.getItem("template-shifts");
        console.log("Loading template from localStorage:", raw);
        if (!raw) {
          setAlertMessage("No saved template found");
          return;
        }
        try {
          weekToLoad = deserializeWeek(raw);
          console.log(
            "Loaded template from localStorage:",
            JSON.stringify(weekToLoad)
          );
        } catch (err) {
          console.error("Failed to parse stored template:", err);
          setAlertMessage("Corrupted template data");
          return;
        }
      }

      const clearedWeek = clearShiftAssignments(weekToLoad);
      resetHoursToEmployees();
      dispatch({ type: "LOAD_WEEK", week: clearedWeek });
      setAlertMessage("Template loaded successfully");
    },
    [resetHoursToEmployees, dispatch, setAlertMessage]
  );

  const saveToTemplate = useCallback(() => {
    if (state.status === "modified") {
      const sortingWeek = new Map(
        Array.from(state.week.entries()).map(([dayIndex, dayMap]) => [
          dayIndex,
          new Map(sortDayGroupedByRole(dayMap)),
        ])
      );
      resetHoursToEmployees();
      localStorage.setItem("template-shifts", serializeWeek(sortingWeek));
      setAlertMessage("Template saved successfully");
    }
  }, [resetHoursToEmployees, state.status, state.week]);

  const value = useMemo<RotaContextType>(
    () => ({
      week: state.week,
      addApiShifs,
      addShift,
      updateShift,
      deleteShift,
      replaceDay,
      loadTemplate,
      saveToTemplate,
    }),
    [
      state.week,
      addShift,
      updateShift,
      deleteShift,
      replaceDay,
      loadTemplate,
      addApiShifs,
      saveToTemplate,
    ]
  );

  return (
    <RotaContext.Provider value={value}>
      {children}
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </RotaContext.Provider>
  );
};

export const useRotaContext = (): RotaContextType => {
  const ctx = useContext(RotaContext);
  if (!ctx) throw new Error("useRotaContext must be inside RotaProvider");
  return ctx;
};
