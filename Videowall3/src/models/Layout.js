const mongoose = require("mongoose");

const LayoutSchema = new mongoose.Schema({
  slots: [Number], // array de cameraIds
});

module.exports = mongoose.model("Layout", LayoutSchema);