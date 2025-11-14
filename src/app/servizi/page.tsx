export default function ServiziPage() {
  const servizi = [
    {
      title: "Servizio 1",
      desc: "Descrizione breve del servizio 1.",
    },
    {
      title: "Servizio 2",
      desc: "Descrizione breve del servizio 2.",
    },
    {
      title: "Servizio 3",
      desc: "Descrizione breve del servizio 3.",
    },
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Servizi</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {servizi.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-xl shadow-sm p-4 border"
          >
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-slate-900 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
