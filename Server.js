import express from "express";
import cors from "cors";

const app = express();
app.use(cors());      // Allow browser POSTs
app.use(express.json());

const keys = new Set();

// Auth endpoint
app.post("/auth", (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false });
  keys.add(key);
  res.json({ success: true, totalKeys: keys.size });
});

// Validate endpoint
app.post("/validate", (req, res) => {
  const { key } = req.body;
  res.json({ valid: keys.has(key) });
});

// Health check
app.get("/", (req, res) => res.send("Auth API running"));

// Render sets PORT via environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));