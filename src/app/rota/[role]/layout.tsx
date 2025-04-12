type Params = Promise<{ role: "CTM" | "TL" }>;

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { role: role } = await params;
  if (role.toUpperCase() === "CTM" || role.toUpperCase() === "TL") {
    return {
      title: `Shift Wizard Create Rota - ${role.toUpperCase()}`,
      description: `Create your rota for the week to ${
        role === "TL" ? "team leaders and managers" : "customer team members"
      } `,
    };
  }
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
