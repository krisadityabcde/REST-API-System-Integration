import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TambahRestoran from "./pages/TambahRestoran";
import EditRestoran from "./pages/EditRestoran";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/tambah" element={<TambahRestoran />} />
      <Route path="/:id/edit" element={<EditRestoran />} />
    </Routes>
  );
}

export default App;
