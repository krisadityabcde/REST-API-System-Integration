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

// POST tambah restoran baru
app.post("/restaurants", async (req, res) => {
  const { name, location, rating } = req.body;
  await db.collection("restaurants").add({ name, location, rating });
  res.json({ message: "Restoran berhasil ditambahkan!" });
});

// DELETE restoran berdasarkan ID
app.delete("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("restaurants").doc(id).delete();
  res.json({ message: "Restoran dihapus!" });
});

// Jalankan server di port 5000
app.listen(5000, () => console.log("Server berjalan di port 5000"));
