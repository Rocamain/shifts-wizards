"use client";

import { useRef, useState, useEffect } from "react";
import WeekDay from "./WeekDay";
import { Weekday } from "@/lib/rota/rota";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

export default function WeeklyRota() {
  const scroller = useRef<HTMLDivElement>(null);
  const { week } = useRotaContext();

  const [canScroll, setCanScroll] = useState(false);

  // check overflow whenever content or window size changes
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const check = () => {
      setCanScroll(el.scrollWidth > el.clientWidth);
    };

    check();
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, [week]); // re-run when 'week' data changes

  const scrollBy = (distance: number) =>
    scroller.current?.scrollBy({ left: distance, behavior: "smooth" });

  const days = [0, 1, 2, 3, 4, 5, 6] as Weekday[];

  const cols = days
    .map((d) => ((week.get(d)?.size ?? 0) > 0 ? "auto" : "1fr"))
    .join(" ");

  return (
    <div className="relative overflow-visible">
      {canScroll && (
        <button
          onClick={() => scrollBy(-300)}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow h-10 w-10 flex items-center justify-center"
        >
          ❮
        </button>
      )}

      <div ref={scroller} className="overflow-x-auto scrollbar-hide">
        <div
          className="grid auto-rows-auto divide-x divide-gray-400 border border-gray-500"
          style={{ gridTemplateColumns: cols, minWidth: "100%" }}
        >
          {days.map((d) => (
            <div key={d} className="flex-1 basis-0 flex flex-col">
              <WeekDay day={d as Weekday} />
            </div>
          ))}
        </div>
      </div>

      {canScroll && (
        <button
          onClick={() => scrollBy(300)}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow h-10 w-10 flex items-center justify-center"
        >
          ❯
        </button>
      )}
    </div>
  );
}
