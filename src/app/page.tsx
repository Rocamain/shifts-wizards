export default function Home() {
  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto bg-gray-200">
      {/* Project Scope and Benefits */}
      <section>
        <h2 className="text-2xl font-bold mb-2">
          Shift Wizard – Project Overview
        </h2>
        <h3 className="text-xl font-semibold mb-1">📌 Scope & Benefits</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Minimize the time spent building rotas manually</li>
          <li>Increase productivity and efficiency for rota planners</li>
          <li>
            Respect employee <strong>availability and rest needs</strong>
          </li>
          <li>Promote fair distribution of shifts across roles and staff</li>
          <li>
            Encourage <strong>weekly shift variation</strong> to prevent burnout
          </li>
        </ul>
      </section>

      {/* How it Works */}
      <section>
        <h3 className="text-xl font-semibold mb-2">🚮 How It Works</h3>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Define Your Team</strong>: Add employees with contract
            hours, roles (TL, CTM, Baker), and unavailable times.
          </li>
          <li>
            <strong>Set Shop Hours & Shift Durations</strong>: Define your
            shop’s opening hours and preferred shift lengths.
          </li>
          <li>
            <strong>Build Your Rota</strong>: Start with TLs, then CTMs and
            Bakers. Manually create all necessary shifts.
          </li>
          <li>
            <strong>Auto-Assign Shifts</strong>: Use the smart assign tool to
            allocate employees to shifts based on your rules.
          </li>
        </ol>
      </section>

      {/* Constraints */}
      <section>
        <h3 className="text-xl font-semibold mb-2">📏 Rules & Constraints</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            ⏱️ Max shift length: <strong>13 hours per day</strong>
          </li>
          <li>
            🛌 Min rest time: <strong>11 hours between shifts</strong>
          </li>
          <li>❌ No shifts during unavailable periods</li>
          <li>🧹 Fair distribution of shifts by hours</li>
          <li>🧩 Rotas change weekly to reduce monotony</li>
        </ul>
      </section>

      {/* Time Savings Estimate */}
      <section>
        <h3 className="text-xl font-semibold mb-2">⏳ Time Savings Estimate</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            🧶 Estimated <strong>0.5–1.5 hours saved per week</strong>
          </li>
          <li>🧑‍💼 Focus more on store operations, less on paperwork</li>
          <li>⚙️ Reduce errors and ensure compliance automatically</li>
        </ul>
      </section>
    </div>
  );
}
