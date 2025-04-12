"use client";

import { useState } from "react";
import CircularHoursBar from "./CircularHoursBar";
import HoursInput from "./HoursInput";

export default function ShopHours() {
  const [hours, setHours] = useState<string>("");

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setHours(value);
    }
  };

  // Calculate percentage based on 40 hours full-time
  const percentage = hours ? Math.min((parseInt(hours) / 40) * 100, 100) : 0;
  return (
    <div className="flex space-x-10">
      <HoursInput hours={hours} onHoursChange={handleHoursChange} />
      <CircularHoursBar percentage={percentage} />
    </div>
  );
}
