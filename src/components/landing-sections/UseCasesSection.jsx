const users = ["Farmers", "Agronomists", "Agribusinesses", "NGOs & Cooperatives"];

export default function UseCasesSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        Who Is AngaGrow For?
      </h2>

      <div className="grid md:grid-cols-4 gap-8 text-center">
        {users.map((u, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{u}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
