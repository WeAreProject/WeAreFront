const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");

const app = express();

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:3000", // Ajusta según tu frontend
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api", authRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(5000, () => console.log("🚀 Servidor corriendo en http://localhost:5000"));
  })
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));