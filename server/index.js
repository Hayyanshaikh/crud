// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;  

// Connect to MongoDB
connectDB();

// Enable CORS for specific origin
// app.use(cors({ 
//   origin: ["*"],
// }));
app.use(cors());

// Middleware
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Handle preflight requests for all routes
app.options('*', cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
