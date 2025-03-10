const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// Inisialisasi Firebase
const serviceAccount = require("./rest-api-system-integration-firebase-adminsdk-fbsvc-91d24f2bab.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health Check
app.get("/", (req, res) => {
  res.send("Server berjalan!");
});

// GET semua restoran
app.get("/restaurants", async (req, res) => {
  const snapshot = await db.collection("restaurants").get();
  let restaurants = [];
  snapshot.forEach((doc) => restaurants.push({ id: doc.id, ...doc.data() }));
  res.json(restaurants);
});

// GET restoran berdasarkan ID
app.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const doc = await db.collection("restaurants").doc(id).get();

  if (!doc.exists) {
    return res.status(404).json({ message: "Restoran tidak ditemukan!" });
  }

  res.json(doc.data());
});


// POST tambah restoran baru
app.post("/restaurants", async (req, res) => {
  const { name, location, kategori } = req.body;

  // Hitung jumlah data dalam koleksi untuk menentukan ID baru
  const snapshot = await db.collection("restaurants").orderBy("id", "desc").limit(1).get();
  let newId = 1; // Default jika tidak ada data

  if (!snapshot.empty) {
    newId = snapshot.docs[0].data().id + 1; // ID terakhir + 1
  }

  await db.collection("restaurants").doc(newId.toString()).set({ id: newId, name, location, kategori });
  res.json({ message: "Restoran berhasil ditambahkan!", id: newId });
});


// DELETE restoran berdasarkan ID
app.delete("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("restaurants").doc(id).delete();
  res.json({ message: "Restoran berhasil dihapus!" });
});

// PUT update restoran berdasarkan ID
app.put("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location, kategori } = req.body;

  await db.collection("restaurants").doc(id).update({ name, location, kategori });
  res.json({ message: "Restoran berhasil diperbarui!" });
});


// Jalankan server di port 5000
app.listen(5000, () => console.log("Server berjalan di port 5000"));
