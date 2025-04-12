"use client";

import { useEffect, useState } from "react";
import { WEEKDAY_NAMES } from "@/lib/rota/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface DayTitleProps {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export default function DayTitle({ day }: DayTitleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [routeBack, setRouteBack] = useState<string | null>(null);

  const currentDayPathCTM = `/rota/ctm/${day}`;
  const currentDayPathTL = `/rota/tl/${day}`;
  const isCurrentDay =
    pathname === currentDayPathCTM || pathname === currentDayPathTL;

  const rootPath = pathname.split("/").slice(0, 3).join("/");

  useEffect(() => {
    if (!routeBack && isCurrentDay) {
      setRouteBack(rootPath);
    }
  }, [isCurrentDay, rootPath, routeBack]);

  return (
    <>
      {isCurrentDay && routeBack && (
        <button
          className="block absolute top-20 right-10 z-10 bg-blue-500 text-center font-bold text-white text-lg hover:underline px-4 py-2 rounded"
          onClick={() => router.push(routeBack)}
        >
          Back
        </button>
      )}

      <div className="bg-blue-500">
        <Link
          href={`${rootPath}/${day}`}
          className={`block text-center font-bold text-white text-lg ${
            isCurrentDay ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {WEEKDAY_NAMES[day]}
        </Link>
      </div>
    </>
  );
}
