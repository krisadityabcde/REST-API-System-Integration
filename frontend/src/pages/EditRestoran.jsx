import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditRestoran() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({ name: "", location: "", kategori: "" });

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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <Link to="/" className="text-lg font-bold text-white">🍽️ RestoranKu</Link>
      </nav>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Edit Restoran</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              value={restaurant.name} 
              onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
              type="text" 
              value={restaurant.location} 
              onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
           <select
              value={restaurant.kategori}
              onChange={(e) => setRestaurant({ ...restaurant, kategori: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="Ayam">Ayam</option>
              <option value="Sapi">Sapi</option>
              <option value="Babi">Babi</option>
              <option value="Bebek">Bebek</option>
              <option value="Dessert">Dessert</option>
              <option value="Camilan">Camilan</option>
              <option value="Seafood">Seafood</option>
            </select>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRestoran;
