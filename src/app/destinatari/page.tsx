export default function DestinatariPage() {
  const profili = [
    "Startup che vogliono X",
    "Professionisti che vogliono Y",
    "Aziende che vogliono Z",
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold mb-2">Per chi è questo servizio</h1>
      <p className="text-slate-900 leading-relaxed">
        Spiega chiaramente chi è il tuo cliente ideale e chi non lo è.
      </p>
      <ul className="list-disc list-inside text-slate-900 space-y-1">
        {profili.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
