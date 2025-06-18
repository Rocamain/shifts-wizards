import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="print:hidden bg-blue-600 text-white shadow-md">
      <div className="max-w-[1560px] mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:opacity-90 transition"
        >
          Shift Wizard
        </Link>
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <Link
              href="/employees"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Employees
            </Link>
          </li>
          <li>
            <Link
              href="/rota/tl"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Create Rota
            </Link>
          </li>
          <li>
            <Link
              href="/rota"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Publish Rota
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
