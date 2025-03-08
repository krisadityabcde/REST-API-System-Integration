import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({ name: "", location: "", rating: "" });

  // Fetch data restoran dari backend
  useEffect(() => {
    axios.get("http://localhost:5000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Tambah restoran baru
  const addRestaurant = () => {
    axios.post("http://localhost:5000/restaurants", newRestaurant)
      .then(() => {
        setRestaurants([...restaurants, newRestaurant]);
        setNewRestaurant({ name: "", location: "", rating: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Daftar Restoran</h1>
      <ul>
        {restaurants.map((resto, index) => (
          <li key={index}>
            <strong>{resto.name}</strong> - {resto.location} ⭐ {resto.rating}
          </li>
        ))}
      </ul>

      <input type="text" placeholder="Nama Restoran" value={newRestaurant.name} onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />
      <input type="text" placeholder="Lokasi" value={newRestaurant.location} onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })} />
      <input type="number" placeholder="Rating" value={newRestaurant.rating} onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: e.target.value })} />
      <button onClick={addRestaurant}>Tambah Restoran</button>
    </div>
  );
}

export default App;
