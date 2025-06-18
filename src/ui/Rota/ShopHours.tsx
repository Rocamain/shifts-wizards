"use client";

import { useState } from "react";
import CircularHoursBar from "./CircularHoursBar";
import HoursInput from "./HoursInput";
import Box from "../Other/Box";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { getWeekHours } from "@/lib/rota/utils";
import { ClockIcon, HomeIcon } from "@heroicons/react/24/outline";
import Scheduler from "@/ui/Rota/Schedule/Scheduler";

export default function ShopHours() {
  const [shopHours, setHours] = useState<number>(0);
  const [isInputView, setView] = useState<boolean>(true);
  const { week } = useRotaContext();
  const workingHours = getWeekHours({ week });

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 4) {
      setHours(value);
    }
  };

  const handleViewChange = () => {
    setView(!isInputView);
  };

  const percentage = shopHours
    ? Math.min((shopHours / workingHours) * 100, workingHours)
    : 0;
  return (
    <Box title="Actions">
      <div className="flex space-x-6 items-center justify-center">
        <div className="w-[180px] mx-auto h-[200px] border-2 border-gray-300 p-4 rounded-lg shadow-md">
          <div className="flex justify-between gap-4 mb-4">
            <div
              className="flex items-center justify-between"
              onClick={handleViewChange}
            >
              <ClockIcon className="h-5 w-5 text-blue-500" />
              <p className="font-semibold">{workingHours}</p>
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5 text-blue-500" />
              <p className="font-semibold">{shopHours}</p>
            </div>
          </div>
          <div className="">
            {isInputView && (
              <div className="">
                <HoursInput
                  shopHours={shopHours}
                  onViewChange={handleViewChange}
                  onHoursChange={handleHoursChange}
                />
              </div>
            )}
            {!isInputView && (
              <div onClick={handleViewChange} className="cursor-pointer ">
                <CircularHoursBar percentage={percentage} />
              </div>
            )}
          </div>
        </div>

        <Scheduler />
      </div>
    </Box>
  );
}
