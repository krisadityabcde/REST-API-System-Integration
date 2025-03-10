import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [filterRating, setFilterRating] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus restoran ini?");
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/restaurants/${id}`)
        .then(() => setRestaurants(restaurants.filter((resto) => resto.id !== id)))
        .catch((err) => console.error(err));
    }
  };

  // Filter restoran berdasarkan nama dan rating
  const filteredRestaurants = restaurants.filter((resto) => {
    const matchName = resto.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRating = filterRating === "All" || resto.rating >= parseFloat(filterRating);
    return matchName && matchRating;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-white">
          <Link to="/" className="text-lg font-bold">🍽️ RestoranKu</Link>
          <div className="flex items-center space-x-4">
            {/* Input Pencarian Nama */}
            <input
              type="text"
              placeholder="Cari restoran..."
              className="px-3 py-1 rounded-md text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Dropdown Filter Rating */}
            <select
              className="px-3 py-1 bg-white text-black rounded-md cursor-pointer"
              onChange={(e) => setFilterRating(e.target.value)}
              value={filterRating}
            >
              <option value="All">Semua Rating</option>
              <option value="5">5 ke atas</option>
              <option value="4.5">4.5 ke atas</option>
              <option value="4">4 ke atas</option>
              <option value="3.5">3.5 ke atas</option>
            </select>

            {/* Tombol Tambah Restoran */}
            <Link to="/tambah">
              <button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md">
                ➕ Tambah Restoran
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Daftar Restoran */}
      <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Daftar Restoran</h1>

        <ul className="space-y-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((resto) => (
              <li key={resto.id} className="p-4 border rounded-lg flex justify-between items-center shadow bg-gray-50">
                <div className="text-lg font-medium flex items-center gap-2">
                  <span>{resto.name} - {resto.location}</span>
                  <span className="flex items-center">⭐ {resto.rating}</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <Link to={`/${resto.id}/edit`}>
                    <button className="px-3 py-1 bg-yellow-400 text-white rounded-md flex items-center">
                      ✏️ Edit
                    </button>
                  </Link>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md flex items-center"
                    onClick={() => handleDelete(resto.id)}
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Tidak ada restoran yang sesuai.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default LandingPage;
