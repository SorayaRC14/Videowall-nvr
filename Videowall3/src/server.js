const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Camera = require("./models/Camera");
const Layout = require("./models/Layout");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/videowall")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));


// ================= CAMERAS =================

app.get("/api/cameras", async (req, res) => {
  const cameras = await Camera.find();
  res.json(cameras);
});

app.post("/api/cameras", async (req, res) => {
  const cam = new Camera(req.body);
  await cam.save();
  res.json(cam);
});


// ================= LAYOUT =================

app.get("/api/layout", async (req, res) => {
  let layout = await Layout.findOne();
  if (!layout) {
    layout = new Layout();
    await layout.save();
  }
  res.json(layout);
});

app.post("/api/layout", async (req, res) => {
  let layout = await Layout.findOne();
  if (!layout) {
    layout = new Layout({ slots: req.body.slots });
  } else {
    layout.slots = req.body.slots;
  }
  await layout.save();
  res.json(layout);
});

// ================= WEBRTC ==================
app.get("/api/cameras/webrtc", async (req, res) => {
    const cameras = await Camera.find({ enabled: true });
  
    // Para cada cámara, construimos URL WebRTC
    const camerasWithWebRTC = cameras.map(cam => ({
      _id: cam._id,
      name: cam.name,
      path: cam.path,
      rtspUrl: cam.rtspUrl,
      webrtcUrl: `http://localhost:8889/${cam.path}` // MediaMTX expone WebRTC
    }));
  
    res.json(camerasWithWebRTC);
  });


app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});