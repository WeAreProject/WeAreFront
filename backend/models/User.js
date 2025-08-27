const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  username: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  role: { type: String, enum: ["customer", "owner"], default: "customer" },
  phone: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);