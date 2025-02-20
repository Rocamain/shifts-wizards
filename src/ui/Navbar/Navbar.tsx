import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="print:hidden bg-blue-500 text-white px-4 py-3">
      <div className="w-[1560px] mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-lg font-semibold">
          Shift Wizard
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/employees" className="hover:underline">
              Employees
            </Link>
          </li>
          <li>
            <Link href="/rota/tl" className="hover:underline">
              Create Rota
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
