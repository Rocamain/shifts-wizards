import Templates from "@/ui/Rota/Templates";
import EmployeeList from "@/ui/Employees/EmployeeList";
import RouteSelector from "@/ui/Rota/RouteSelector";
import ShopHours from "@/ui/Rota/ShopHours";
import { notFound } from "next/navigation";
import Box from "@/ui/Other/Box";
import SampleButton from "@/ui/Rota/SampleButton";

type Params = Promise<{
  role: "CTM" | "TL" | "BAKER";
  searchParams: { [key: string]: string | string[] | undefined };
}>;

const roleObject = {
  CTM: "Customer Team Member",
  TL: "Team Leader",
  BAKER: "Baker",
  FULL: "All employees",
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { role: role } = await params;

  const rolepath = role.toUpperCase();
  const roleTitle = roleObject[rolepath as keyof typeof roleObject];
  if (
    role.toUpperCase() === "CTM" ||
    role.toUpperCase() === "TL" ||
    role.toUpperCase() === "BAKER" ||
    role.toUpperCase() === "FULL"
  ) {
    return {
      title: `Shift Wizard Create Rota - ${rolepath}`,
      description: `Create your rota for the week to ${roleTitle} `,
    };
  }
};

export default async function LayoutRole({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const getRoleTitle: Map<string, string> = new Map([
    ["ctm", "Customer Team Member's Rota"],
    ["tl", "Team Leader's Rota"],
    ["baker", "Bakers Rota"],
    ["full", "General Rota"],
  ]);
  const { role } = await params;

  const roleTitle = getRoleTitle.get(role.toLowerCase());
  if (roleTitle)
    return (
      <>
        <div className="flex justify-between mb-10 items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">{roleTitle}</h2>
          </div>
          <div className="flex justify-between gap-16 items-end ">
            <Box title="Load Sample">
              <div className="w-[230px] h-[40px] flex items-center justify-center">
                <SampleButton />
              </div>
            </Box>
            <RouteSelector />
          </div>
        </div>
        <div className="py-8 flex items-center gap-10 flex-wrap mb-8">
          <div>
            <EmployeeList />
          </div>
          <div>
            <Templates />
          </div>
          <div>
            <ShopHours />
          </div>
        </div>
        {children}
      </>
    );

  return notFound();
}
