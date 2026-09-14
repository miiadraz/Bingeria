export default function RulesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Pravila korištenja</h1>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
        <li>
          Aplikacija je edukativni projekt, bez stvarne registracije korisnika.
        </li>
        <li>
          Podaci o watchlisti spremaju se lokalno na serveru, bez baze podataka.
        </li>
        <li>
          Sadržaj serija (slike, opisi) dolazi s TVmaze API-ja i u vlasništvu je
          njihovih izvora.
        </li>
      </ul>
    </>
  );
}
