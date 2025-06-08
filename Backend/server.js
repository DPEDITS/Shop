const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// ✅ Replace default CORS with this:
app.use(
  cors({
    origin: ["my-frontend29.netlify.app"], // ✅ replace with your actual Netlify URL
    credentials: true, // ✅ only if you're using cookies or tokens in headers
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
