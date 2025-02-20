import Link from "next/link";

export default function Rota() {
  return (
    <div className="mt-10">
      <Link href={"/"} className="text-lg font-semibold">
        Shift Wizard Rota
      </Link>
      <div className="mt-8 flex justify-end">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/rota/tl"
              className="hover:underline bg-blue-500 text-white px-4 py-2 rounded"
            >
              TL Rota
            </Link>
          </li>
          <li>
            <Link
              href="/rota/ctm"
              className="hover:underline bg-blue-500 text-white px-4 py-2 rounded"
            >
              CTM Rota
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
