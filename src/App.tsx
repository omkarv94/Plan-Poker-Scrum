// import Home from './pages/Home';

// export default function App() {
//   return <Home />;
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomSelector from "./pages/RoomSelector";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomSelector />} />
        <Route path="/home/:roomId" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
