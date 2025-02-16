import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-screen mx-auto bg-gray-200">
      <Image
        src="/ShiftWizard.webp"
        width="500"
        height={800}
        alt="wizard with a rota on his hand"
      />
    </div>
  );
}
