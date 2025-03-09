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
      <Link to="/tambah">
        <button>Tambah Restoran</button>
      </Link>
    </div>
  );
}

export default LandingPage;
