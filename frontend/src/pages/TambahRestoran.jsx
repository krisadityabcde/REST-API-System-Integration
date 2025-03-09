import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TambahRestoran() {
  const [newRestaurant, setNewRestaurant] = useState({ name: "", location: "", rating: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/restaurants", newRestaurant)
      .then(() => {
        navigate("/"); // Redirect kembali ke landing page setelah submit
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Tambah Restoran</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nama Restoran" value={newRestaurant.name}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />
        <input type="text" placeholder="Lokasi" value={newRestaurant.location}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })} />
        <input type="number" placeholder="Rating" value={newRestaurant.rating}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: e.target.value })} />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default TambahRestoran;
