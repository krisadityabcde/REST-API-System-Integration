import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/restaurants/${id}`)
      .then(() => setRestaurants(restaurants.filter((resto) => resto.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Daftar Restoran</h1>
      <ul>
        {restaurants.map((resto) => (
          <li key={resto.id}>
            <span><strong>{resto.name}</strong> - {resto.location} ⭐ {resto.rating}</span>
            <div className="button-group">
              <Link to={`/${resto.id}/edit`}>
                <button className="edit-btn">✏️</button>
              </Link>
              <button className="delete-btn" onClick={() => handleDelete(resto.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/tambah">
        <button>Tambah Restoran</button>
      </Link>
    </div>
  );
}

export default LandingPage;
