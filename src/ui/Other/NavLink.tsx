"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  const baseSegments = pathname.split("/").slice(3);
  const additionalPath = baseSegments.length
    ? "/" + baseSegments.join("/")
    : "";

  const newPath = `${href}${additionalPath}`;

  return (
    <Link
      href={newPath}
      scroll={false}
      prefetch
      className={clsx(
        "hover:bg-blue-400 px-4 py-2 rounded text-white shadow-xl",
        isActive ? "bg-blue-500" : "bg-gray-500"
      )}
    >
      {children}
    </Link>
  );
}
