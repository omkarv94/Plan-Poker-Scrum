import { useEffect, useState } from "react";
import Header from "../components/Header";
import PlayerList from "../components/PlayerList";
import Card from "../components/Card";

const cards = ["1", "2", "3", "5", "8", "13", "?"];

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [players, setPlayers] = useState<{ name: string; vote?: string | null }[]>([]);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Prompt for name once
  useEffect(() => {
    const storedName = localStorage.getItem("pokerName");
    if (!storedName) {
      const input = prompt("Enter your name:");
      if (input) {
        localStorage.setItem("pokerName", input);
        setName(input);
      }
    } else {
      setName(storedName);
    }
  }, []);

  // Update player list with your vote
  useEffect(() => {
    if (name) {
      const updated = [...players.filter(p => p.name !== name), { name, vote: myVote }];
      setPlayers(updated);
    }
  }, [myVote]);

  const handleVote = (v: string) => {
    setMyVote(v);
  };

  const reset = () => {
    setRevealed(false);
    setPlayers(players.map(p => ({ ...p, vote: undefined })));
    setMyVote(null);
  };

  const signOut = () => {
    localStorage.removeItem("pokerName");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url('/bg.jpg')` }}>
      <div className="backdrop-blur-sm min-h-screen bg-black/60">
        <Header />
        <div className="p-4 text-center">
          {/* Sign out button */}
          <button
            onClick={signOut}
            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
          >
            Sign Out
          </button>

          {/* Voting Cards */}
          <div className="flex justify-center flex-wrap gap-3 mb-4 mt-8">
            {cards.map(c => (
              <Card key={c} value={c} onClick={() => handleVote(c)} selected={myVote === c} />
            ))}
          </div>

          {/* Action Buttons */}
          <button onClick={() => setRevealed(true)} className="bg-green-600 px-4 py-2 rounded mr-2">Reveal</button>
          <button onClick={reset} className="bg-red-600 px-4 py-2 rounded">Reset</button>
        </div>

        {/* Player List */}
        <PlayerList players={players.filter(p => p.vote)} revealed={revealed} />
      </div>
    </div>
  );
}
