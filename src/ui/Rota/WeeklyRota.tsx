"use client";
import { useRef } from "react";
import WeekDay from "./WeekDay";
import { Weekday } from "@/lib/rota/rota";

export default function WeeklyRota() {
  // 1) a ref to our scrollable container
  const scroller = useRef<HTMLDivElement>(null);

  // 2) handlers that nudge it left or right
  const scrollBy = (distance: number) => {
    if (!scroller.current) return;
    scroller.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left chevron */}
      <button
        onClick={() => scrollBy(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
      >
        ❮
      </button>

      {/* The scrollable row */}
      <div ref={scroller} className="flex flex-nowrap overflow-x-auto px-12">
        {[0, 1, 2, 3, 4, 5, 6].map((d) => (
          <WeekDay key={d} day={d as Weekday} />
        ))}
      </div>

      {/* Right chevron */}
      <button
        onClick={() => scrollBy(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
      >
        ❯
      </button>
    </div>
  );
}
