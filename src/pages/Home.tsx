import { useEffect, useState } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import { db } from "../lib/firebase";
import Header from "../components/Header";
import PlayerList from "../components/PlayerList";
import Card from "../components/Card";

const cards = ["1", "2", "3", "5", "8", "13", "?"];

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [players, setPlayers] = useState<{ name: string; vote?: string | null }[]>([]);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

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

  // Listen for players
  useEffect(() => {
    const playersRef = ref(db, "players");
    const unsub = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          name: key,
          vote: data[key].vote ?? undefined,
        }));
        setPlayers(list);
      } else {
        setPlayers([]);
      }
    });
    return () => unsub();
  }, []);

  // Listen for revealed flag
  useEffect(() => {
    const revealedRef = ref(db, "revealed");
    return onValue(revealedRef, (snapshot) => {
      setRevealed(!!snapshot.val());
    });
  }, []);

  const handleVote = (v: string) => {
    setMyVote(v);
    if (name) {
      set(ref(db, `players/${name}`), { vote: v });
    }
  };

  const handleReveal = () => {
    set(ref(db, "revealed"), true);
  };

  const handleReset = () => {
    setRevealed(false);
    set(ref(db, "revealed"), false);
    remove(ref(db, "players"));
    setMyVote(null);
  };

  const signOut = () => {
    localStorage.removeItem("pokerName");
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/batman-bg.jpg')` }}
    >
      <div className="backdrop-blur-sm min-h-screen bg-black/70">
        <Header />
        <div className="p-4 text-center">
          <div className="mb-2">Hi, {name}</div>
          <div className="flex justify-center flex-wrap gap-3 mb-4">
            {cards.map((c) => (
              <Card key={c} value={c} onClick={() => handleVote(c)} selected={myVote === c} />
            ))}
          </div>
          <button onClick={handleReveal} className="bg-green-600 px-4 py-2 rounded mr-2">
            Reveal
          </button>
          <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded mr-2">
            Reset
          </button>
          <button onClick={signOut} className="bg-gray-600 px-4 py-2 rounded">
            Sign Out
          </button>
        </div>
        <PlayerList players={players.filter((p) => p.vote)} revealed={revealed} />
      </div>
    </div>
  );
}
