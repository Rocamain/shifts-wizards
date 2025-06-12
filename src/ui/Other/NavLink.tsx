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

  // Determine if the link is active (exact match or starts with the href)
  const isActive = pathname.startsWith(href);

  // Preserve subpaths (e.g., /rota/CTM/Tuesday → /rota/TL/Tuesday)
  const baseSegments = pathname.split("/").slice(3); // remove /rota/{role}
  const additionalPath = baseSegments.length
    ? "/" + baseSegments.join("/")
    : "";

  // Build the new link path with preserved subpath
  const newPath = `${href}${additionalPath}`;

  return (
    <Link
      href={newPath}
      scroll={false}
      prefetch
      className={clsx(
        "hover:underline px-4 py-2 rounded text-white shadow-xl",
        isActive ? "bg-blue-500" : "bg-gray-500"
      )}
    >
      {children}
    </Link>
  );
}
