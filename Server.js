import express from "express";

const app = express();
app.use(express.json());

// In-memory key store
const keys = new Set();

/**
 * AUTH — register a key
 */
app.post("/auth", (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ success: false, message: "Key required" });
  }

  keys.add(key);

  res.json({
    success: true,
    message: "Key registered",
    totalKeys: keys.size
  });
});

/**
 * VALIDATE — check a key
 */
app.post("/validate", (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ valid: false });
  }

  res.json({
    valid: keys.has(key)
  });
});

/**
 * OPTIONAL — health check
 */
app.get("/", (req, res) => {
  res.send("Auth API running");
});

// Render uses PORT env var
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
