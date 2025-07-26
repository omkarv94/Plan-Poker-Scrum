// import { useEffect, useState } from "react";
// import { ref, onValue, set, remove } from "firebase/database";
// import { db } from "../lib/firebase";
// import Header from "../components/Header";
// import PlayerList from "../components/PlayerList";
// import Card from "../components/Card";

// const cards = ["0.5","1", "1.5", "2", "3", "4", "5", "8", "13","?"];

// export default function Home() {
//   const [name, setName] = useState<string | null>(null);
//   const [players, setPlayers] = useState<{ name: string; vote?: string | null }[]>([]);
//   const [myVote, setMyVote] = useState<string | null>(null);
//   const [revealed, setRevealed] = useState(false);

//   useEffect(() => {
//     const storedName = localStorage.getItem("pokerName");
//     if (!storedName) {
//       const input = prompt("Enter your name:");
//       if (input) {
//         localStorage.setItem("pokerName", input);
//         setName(input);
//       }
//     } else {
//       setName(storedName);
//     }
//   }, []);

//   useEffect(() => {
//     const playersRef = ref(db, "players");
//     const unsub = onValue(playersRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const list = Object.keys(data).map((key) => ({
//           name: key,
//           vote: data[key].vote ?? undefined,
//         }));
//         setPlayers(list);
//       } else {
//         setPlayers([]);
//       }
//     });
//     return () => unsub();
//   }, []);

//   useEffect(() => {
//     const revealedRef = ref(db, "revealed");
//     return onValue(revealedRef, (snapshot) => {
//       setRevealed(!!snapshot.val());
//     });
//   }, []);

//   const handleVote = (v: string) => {
//     setMyVote(v);
//     if (name) {
//       set(ref(db, `players/${name}`), { vote: v });
//     }
//   };

//   const handleReveal = () => {
//     set(ref(db, "revealed"), true);
//   };

//   const handleReset = () => {
//     setRevealed(false);
//     set(ref(db, "revealed"), false);
//     remove(ref(db, "players"));
//     setMyVote(null);
//   };

//   const signOut = () => {
//     localStorage.removeItem("pokerName");
//     window.location.reload();
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center text-white"
//       style={{ backgroundImage: `url('/batman-bg.jpg')` }}
//     >
//       <div className="backdrop-blur-sm min-h-screen bg-black/70">
//         <Header />
//         <div className="p-4 text-center">
//           <div className="mb-2 text-xl">Hi, {name}</div>

//           {/* Cards with larger width and more spacing */}
//           <div className="flex justify-center flex-wrap gap-5 mb-6">
//             {cards.map((c) => (
//               <Card key={c} value={c} onClick={() => handleVote(c)} selected={myVote === c} />
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="mb-6">
//             <button onClick={handleReveal} className="bg-green-600 px-4 py-2 rounded mr-2">
//               Reveal
//             </button>
//             <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded mr-2">
//               Reset
//             </button>
//             <button onClick={signOut} className="bg-gray-600 px-4 py-2 rounded">
//               Sign Out
//             </button>
//           </div>

//           {/* Horizontal line */}
//           <hr className="border-t border-gray-500 my-6" />

//           {/* Description */}
//           <p className="text-sm text-gray-300 mt-2">
//             Only those who voted will appear. Click <strong>Reveal</strong> to show votes.
//           </p>

//           {/* Players List */}
//           <PlayerList players={players.filter((p) => p.vote)} revealed={revealed} />

//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/home.tsx

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ref, onValue, set, remove } from "firebase/database";
// import { db } from "../lib/firebase";
// import Header from "../components/Header";
// import PlayerList from "../components/PlayerList";
// import Card from "../components/Card";

// const cards = ["0.5", "1", "1.5", "2", "3", "4", "5", "8", "13", "?"];

// export default function Home() {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [name, setName] = useState<string | null>(null);
//   const [players, setPlayers] = useState<{ name: string; vote?: string | null }[]>([]);
//   const [myVote, setMyVote] = useState<string | null>(null);
//   const [revealed, setRevealed] = useState(false);

//   useEffect(() => {
//     const storedName = localStorage.getItem("pokerName");
//     if (!storedName) {
//       const input = prompt("Enter your name:");
//       if (input) {
//         localStorage.setItem("pokerName", input);
//         setName(input);
//       } else {
//         navigate("/");
//       }
//     } else {
//       setName(storedName);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (!roomId) return;

//     const playersRef = ref(db, `rooms/${roomId}/players`);
//     const unsub = onValue(playersRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const list = Object.keys(data).map((key) => ({
//           name: key,
//           vote: data[key].vote ?? undefined,
//         }));
//         setPlayers(list);
//       } else {
//         setPlayers([]);
//       }
//     });
//     return () => unsub();
//   }, [roomId]);

//   useEffect(() => {
//     if (!roomId) return;

//     const revealedRef = ref(db, `rooms/${roomId}/revealed`);
//     return onValue(revealedRef, (snapshot) => {
//       setRevealed(!!snapshot.val());
//     });
//   }, [roomId]);

//   const handleVote = (v: string) => {
//     setMyVote(v);
//     if (name && roomId) {
//       set(ref(db, `rooms/${roomId}/players/${name}`), { vote: v });
//     }
//   };

//   const handleReveal = () => {
//     if (roomId) {
//       set(ref(db, `rooms/${roomId}/revealed`), true);
//     }
//   };

//   const handleReset = () => {
//     if (roomId) {
//       setRevealed(false);
//       set(ref(db, `rooms/${roomId}/revealed`), false);
//       remove(ref(db, `rooms/${roomId}/players`));
//       setMyVote(null);
//     }
//   };

//   const signOut = () => {
//     localStorage.removeItem("pokerName");
//     navigate("/");
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center text-white"
//       style={{ backgroundImage: `url('/batman-bg.jpg')` }}
//     >
//       <div className="backdrop-blur-sm min-h-screen bg-black/70">
//         <Header />
//         <div className="p-4 text-center">
//           <div className="mb-2 text-xl">Hi, {name}</div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//             {cards.map((c) => (
//               <Card key={c} value={c} onClick={() => handleVote(c)} selected={myVote === c} />
//             ))}
//           </div>

//           <div className="mb-6">
//             <button onClick={handleReveal} className="bg-green-600 px-4 py-2 rounded mr-2">
//               Reveal
//             </button>
//             <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded mr-2">
//               Reset
//             </button>
//             <button onClick={signOut} className="bg-gray-600 px-4 py-2 rounded">
//               Sign Out
//             </button>
//           </div>

//           <hr className="border-t border-gray-500 my-6" />

//           <p className="text-sm text-gray-300 mt-2">
//             Only those who voted will appear. Click <strong>Reveal</strong> to show votes.
//           </p>
//           <div className="max-h-[300px] overflow-y-auto mb-24">
//           <PlayerList players={players.filter((p) => p.vote)} revealed={revealed} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, onValue, set, remove } from "firebase/database";
import { db } from "../lib/firebase";
import Header from "../components/Header";
import PlayerList from "../components/PlayerList";
import Card from "../components/Card";

const cards = ["0.5", "1", "1.5", "2", "3", "4", "5", "8", "13", "?"];

export default function Home() {
  const { roomId } = useParams();
  const navigate = useNavigate();
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
      } else {
        navigate("/");
      }
    } else {
      setName(storedName);
    }
  }, [navigate]);

  useEffect(() => {
    if (!roomId) return;

    const playersRef = ref(db, `rooms/${roomId}/players`);
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
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const revealedRef = ref(db, `rooms/${roomId}/revealed`);
    return onValue(revealedRef, (snapshot) => {
      setRevealed(!!snapshot.val());
    });
  }, [roomId]);

  const handleVote = (v: string) => {
    setMyVote(v);
    if (name && roomId) {
      set(ref(db, `rooms/${roomId}/players/${name}`), { vote: v });
    }
  };

  const handleReveal = () => {
    if (roomId) {
      set(ref(db, `rooms/${roomId}/revealed`), true);
    }
  };

  const handleReset = () => {
    if (roomId) {
      setRevealed(false);
      set(ref(db, `rooms/${roomId}/revealed`), false);
      remove(ref(db, `rooms/${roomId}/players`));
      setMyVote(null);
    }
  };

  const signOut = () => {
    localStorage.removeItem("pokerName");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/batman-bg.jpg')` }}
    >
      <div className="backdrop-blur-sm min-h-screen bg-black/70">
        <Header />
        <div className="text-center">
          <div className="text-xl">Hi, {name}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-startm">
  {/* Left Column: Voting and Controls */}
  <div className="space-y-6 mt-4">
    {/* Vote Cards in 3 rows */}
    <div className="space-y-3">
      <div className="flex justify-center gap-3">
        {["0.5", "1", "1.5", "2"].map((c) => (
          <Card key={c} value={c} onClick={() => handleVote(c)} selected={myVote === c} />
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {["3", "4", "5", "8"].map((c) => (
          <Card key={c} value={c} onClick={() => handleVote(c)} selected={myVote === c} />
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {["13", "?"].map((c) => (
          <Card key={c} value={c} onClick={() => handleVote(c)} selected={myVote === c} />
        ))}
      </div>
    </div>
  </div>
  {/* Right Column: Players & Info */}
  <div className="space-y-2 mt-4 border-l-2 border-white-700 pl-6">
  <div className="text-sm text-gray-300">
      Only those who voted will appear. Click <strong>Reveal</strong> to show votes.
    </div>
     {/* Action Buttons */}
     <div className="flex justify-center flex-wrap gap-4">
      <button onClick={handleReveal} className="bg-green-600 px-4 py-2 rounded">
        Reveal
      </button>
      <button onClick={handleReset} className="bg-red-600 px-4 py-2 rounded">
        Reset
      </button>
      <button onClick={signOut} className="bg-gray-600 px-4 py-2 rounded">
        Sign Out
      </button>
    </div>
    <div className="mb-2 border-gray-600 rounded">
      <PlayerList players={players.filter((p) => p.vote)} revealed={revealed} />
    </div>
  </div>
  </div>
        </div>
      </div>
    </div>
  );
}
