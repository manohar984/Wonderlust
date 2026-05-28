const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const destinationsData = require('./destinationsData');

// Import routes & middleware
const destinationRoutes = require('./routes/destinationRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from the Frontend directory (one level up)
app.use(express.static(path.join(__dirname, '../Frontend')));

// MongoDB Connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wanderlust';
let isMongoConnected = false;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully at ' + MONGODB_URI);
    // isMongoConnected = true;
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    console.log('Running in fallback offline mode.');
  });

// Auto-seed Database function
async function seedDatabase() {
  const Destination = require('./models/Destination');
  try {
    const count = await Destination.countDocuments();
    if (count === 0) {
      console.log('Seeding database with 20 premium destinations...');
      await Destination.insertMany(destinationsData);
      console.log('Database seeded successfully!');
    } else {
      console.log('Destinations already exist in database. Skipping seed.');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
}

/* ==========================================================================
   API Routes
   ========================================================================== */

// 1. Auth routes (Login, Register) - Open
app.use('/api/auth', authRoutes);

// 2. Destinations route - Open
app.use('/api/destinations', destinationRoutes);

// 3. Tickets routes - PROTECTED by JWT Authentication Middleware
app.use('/api/tickets', authMiddleware, ticketRoutes);

// Catch-all route to serve the frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`MVC Server running on: http://localhost:${PORT}`);
});
