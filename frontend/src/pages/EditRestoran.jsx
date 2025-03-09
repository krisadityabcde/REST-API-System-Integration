import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditRestoran() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({ name: "", location: "", rating: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/restaurants/${id}`, restaurant)
      .then(() => navigate("/")) // Redirect ke landing page setelah update
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Edit Restoran</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={restaurant.name} 
          onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })} />
        <input type="text" value={restaurant.location} 
          onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })} />
        <input type="number" value={restaurant.rating} 
          onChange={(e) => setRestaurant({ ...restaurant, rating: e.target.value })} />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default EditRestoran;
