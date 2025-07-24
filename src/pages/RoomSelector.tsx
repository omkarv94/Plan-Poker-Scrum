// src/pages/RoomSelector.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, get } from "firebase/database";
import { db } from "../lib/firebase";

export default function RoomSelector() {
  const navigate = useNavigate();
  const [roomIdInput, setRoomIdInput] = useState("");
  const [error, setError] = useState("");

  const handleCreateRoom = () => {
    const newRoomId = uuidv4().split("-")[0]; // short room ID
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl mb-6 font-bold">Plan Poker</h1>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={handleCreateRoom}
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Create Room
        </button>

        <div className="text-center text-sm text-gray-300">OR</div>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomIdInput}
          onChange={(e) => {
            setRoomIdInput(e.target.value);
            setError("");
          }}
          className="w-full px-3 py-2 rounded text-black"
        />

        <button
          onClick={handleJoinRoom}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Join Room
        </button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
}
