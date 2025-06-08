const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
      origin: [
        "http://localhost:3000", 
        "https://geocalculatorr.netlify.app"
      ],
      credentials: true,
    })
  );
  
app.use(express.json()); // To parse incoming JSON requests

app.use('/api/auth', authRoutes); // Routes for authentication

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
