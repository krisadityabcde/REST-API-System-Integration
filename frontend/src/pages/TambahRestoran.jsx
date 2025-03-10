import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function TambahRestoran() {
  const [newRestaurant, setNewRestaurant] = useState({ name: "", location: "", rating: 0 });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/restaurants", newRestaurant)
      .then(() => {
        navigate("/"); 
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <Link to="/" className="text-lg font-bold text-white">🍽️ RestoranKu</Link>
      </nav>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Tambah Restoran</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Nama Restoran" 
              value={newRestaurant.name} 
              onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
              type="text" 
              placeholder="Lokasi" 
              value={newRestaurant.location} 
              onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
              type="number" 
              placeholder="Rating" 
              value={newRestaurant.rating} 
              onChange={(e) => {
                const value = Math.min(5, Math.max(0, Number(e.target.value)));
                setNewRestaurant({ ...newRestaurant, rating: value });
              }} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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

export default TambahRestoran;
