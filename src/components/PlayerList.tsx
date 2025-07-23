interface Player {
  name: string;
  vote?: string | null;
}

export default function PlayerList({ players, revealed }: { players: Player[]; revealed: boolean }) {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Players</h2>
      <ul className="space-y-2">
        {players.map((p, i) => (
          <li
            key={i}
            className="bg-white/20 text-white px-4 py-2 rounded flex justify-between items-center font-mono text-lg"
          >
            <span className="truncate">{p.name}</span>
            <span className="ml-4 min-w-[2ch] text-right">
              {revealed ? p.vote : p.vote ? "🕶️" : "❔"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
