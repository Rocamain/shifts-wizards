import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shift Wizard Create Rota Main Page`,
  description: "Create your rota for the week",
};

export default function LayoutRota({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 bg-gray-200">
      <h2 className="text-2xl font-semibold">Shift Wizard Rota</h2>

      {children}
    </div>
  );
}
