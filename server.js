const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DATA_PATH = path.join(__dirname, "data", "feedbacks.json");

/* 피드백 저장 */
app.post("/api/feedback", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ success: false });
  }

  let data = [];
  if (fs.existsSync(DATA_PATH)) {
    data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  data.push({
    id: Date.now(),
    content,
    createdAt: new Date().toISOString(),
    status: "검토중"
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`CWS Feedback Server running on ${PORT}`);
});
