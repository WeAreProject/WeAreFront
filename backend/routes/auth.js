const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");

const router = express.Router();

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Registro de usuario
router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { full_name, email, password, role, username, phone } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    // Validación
    if (!email || !password || !full_name) {
      return res.status(400).json({ message: "Campos requeridos faltantes" });
    }

    // Verificar usuario existente
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = new User({
      full_name,
      email,
      password: hashedPassword,
      role: role || "customer",
      username: username || "",
      phone: phone || "",
      image
    });

    await newUser.save();

    // Generar token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Respuesta
    res.status(201).json({
      id: newUser._id,
      full_name: newUser.full_name,
      email: newUser.email,
      username: newUser.username,
      image: newUser.image,
      role: newUser.role,
      token,
      message: "Usuario registrado exitosamente"
    });

  } catch (err) {
    console.error("❌ Error en registro:", err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Respuesta
    res.status(200).json({
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      image: user.image,
      role: user.role,
      token,
      message: "Inicio de sesión exitoso",
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Logout de usuario
router.post("/logout", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;