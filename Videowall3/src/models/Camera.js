const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true }, // cam1
  rtspUrl: { type: String, required: true },
  location: String,
  enabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Camera", CameraSchema);