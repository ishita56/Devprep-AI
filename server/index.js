const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const analyzeRoute = require('./routes/analyze');
const historyRoute = require('./routes/history');
const authRoute = require('./routes/auth');

const app = express();
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use(cors());
app.use(express.json());

app.use('/api/analyze', analyzeRoute);
app.use('/api/history', historyRoute);
app.use('/api/auth', authRoute);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Error:', err));
  const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});