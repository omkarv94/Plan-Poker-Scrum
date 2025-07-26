// src/pages/RoomSelector.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, get, set } from "firebase/database";
import { db } from "../lib/firebase";

export default function RoomSelector() {
  const navigate = useNavigate();
  const [roomIdInput, setRoomIdInput] = useState("");
  const [error, setError] = useState("");

  const handleCreateRoom = async () => {
    const newRoomId = uuidv4().split("-")[0]; // short room ID
    await set(ref(db, `rooms/${newRoomId}`), {
        createdAt: Date.now(),
        revealed: false,
        players: {}
      });
    navigate(`/home/${newRoomId}`);
  };

  const handleJoinRoom = async () => {
    const trimmed = roomIdInput.trim();
    if (trimmed === "") {
      setError("Please enter a room ID.");
      return;
    }

    const roomRef = ref(db, `rooms/${trimmed}`);
    const snapshot = await get(roomRef);

    if (snapshot.exists()) {
      navigate(`/home/${trimmed}`);
    } else {
      setError("Enter valid room number.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/batman-bg.jpg')` }}
    >
      <div className="backdrop-blur-sm min-h-screen bg-black/70">
      <div className="w-full py-4 px-6 bg-gray-800 text-white text-xl font-bold">
        Plan Poker
      </div>
      <div className="flex flex-col items-center justify-center p-4 mt-20">
      <h1 className="text-3xl mb-6 font-bold text-white/80">OPE Plan Poker</h1>

      <div className="space-y-4 w-full max-w-lg bg-white/60 border border-gray-400 rounded-lg p-6 backdrop-blur-sm">
        <button
          onClick={handleCreateRoom}
          className="w-full bg-green-700 py-2.5 rounded hover:bg-green-900 text-lg"
        >
          Create Room
        </button>

        <div className="text-center text-xl text-gray-700 font-bold">OR</div>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomIdInput}
          onChange={(e) => {
            setRoomIdInput(e.target.value);
            setError("");
          }}
          className="w-full px-3 py-2.5 rounded text-black text-lg"
        />

        <button
          onClick={handleJoinRoom}
          className="w-full bg-blue-700 py-2.5 rounded hover:bg-blue-900 text-lg"
        >
          Join Room
        </button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>
      </div>
    </div>
    <footer className="fixed bottom-0 w-full text-center text-white text-m py-5 bg-gray-700 border-t border-gray-600">
  © {new Date().getFullYear()} Plan Poker by Omkar. All rights reserved.
</footer>


</div>
  );
}
