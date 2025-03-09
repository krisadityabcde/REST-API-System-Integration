import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TambahRestoran from "./pages/TambahRestoran";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/tambah" element={<TambahRestoran />} />
    </Routes>
  );
}

export default App;
