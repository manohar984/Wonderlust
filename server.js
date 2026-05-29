const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const destinationsData = require('./destinationsData');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from the current directory
app.use(express.static(path.join(__dirname)));

// MongoDB Connection URI (using 127.0.0.1 for reliability on Windows)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wanderlust';

let isMongoConnected = false;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully at ' + MONGODB_URI);
    isMongoConnected = true;
    seedDatabase();
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('ℹ️ Please ensure MongoDB is installed and running on your system.');
    console.log('ℹ️ Running server in fallback mode: API endpoints will fall back to local data if DB is unavailable.');
  });

// Define schemas
const DestinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  image: String,
  tagline: String,
  description: String,
  minBudget: Number,
  baseCosts: {
    standard: Number,
    premium: Number,
    luxury: Number
  },
  activityCosts: {
    standard: Number,
    premium: Number,
    luxury: Number
  },
  attractions: [String],
  dailyItinerary: mongoose.Schema.Types.Mixed // Flexible object to hold daily key-value pairs
});

const TicketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  destinationId: { type: String, required: true },
  destinationName: { type: String, required: true },
  durationDays: { type: Number, required: true },
  totalTravelers: { type: Number, required: true },
  serviceLevel: { type: String, required: true },
  estimatedBudget: { type: Number, required: true },
  dateGenerated: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Destination = mongoose.model('Destination', DestinationSchema);
const Ticket = mongoose.model('Ticket', TicketSchema);

// Auto-seed Database function
async function seedDatabase() {
  try {
    const count = await Destination.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding database with 20 premium destinations...');
      await Destination.insertMany(destinationsData);
      console.log('🌱 Database seeded successfully!');
    } else {
      console.log('👍 Destinations already exist in database. Skipping seed.');
    }
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
  }
}

/* ==========================================================================
   API Routes
   ========================================================================== */

// 1. GET all destinations
app.get('/api/destinations', async (req, res) => {
  if (!isMongoConnected) {
    console.log('⚠️ MongoDB not connected. Serving in-memory fallback data.');
    return res.json({
      source: 'local_fallback',
      data: destinationsData
    });
  }

  try {
    const destinations = await Destination.find({});
    res.json({
      source: 'mongodb',
      data: destinations
    });
  } catch (err) {
    console.error('❌ Error fetching destinations:', err.message);
    res.status(500).json({ error: 'Failed to retrieve destinations from database', fallback: destinationsData });
  }
});

// 2. POST to save a ticket boarding pass
app.post('/api/tickets', async (req, res) => {
  const ticketData = req.body;

  // Basic validation
  if (!ticketData.ticketNumber || !ticketData.name || !ticketData.email) {
    return res.status(400).json({ error: 'Missing required ticket fields (ticketNumber, name, email).' });
  }

  if (!isMongoConnected) {
    console.log('⚠️ MongoDB not connected. Simulating ticket save (local only).');
    return res.status(201).json({
      success: true,
      savedToDb: false,
      message: 'Simulated ticket generation (database offline).',
      data: ticketData
    });
  }

  try {
    const newTicket = new Ticket(ticketData);
    await newTicket.save();
    console.log(`🎫 Saved ticket ${ticketData.ticketNumber} to MongoDB.`);
    res.status(201).json({
      success: true,
      savedToDb: true,
      data: newTicket
    });
  } catch (err) {
    console.error('❌ Error saving ticket to MongoDB:', err.message);
    // Return mock success to prevent frontend crash even if DB save fails
    res.status(500).json({
      success: false,
      error: 'Failed to save ticket to database',
      fallbackData: ticketData
    });
  }
});

// 3. GET all saved tickets (to easily check MongoDB details)
app.get('/api/tickets', async (req, res) => {
  if (!isMongoConnected) {
    return res.status(503).json({ error: 'Database connection offline' });
  }

  try {
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });
    res.json({
      source: 'mongodb',
      count: tickets.length,
      data: tickets
    });
  } catch (err) {
    console.error('❌ Error fetching tickets:', err.message);
    res.status(500).json({ error: 'Failed to retrieve tickets from database' });
  }
});

// Catch-all route to serve the frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Wanderlust Chronicles server is running on: http://localhost:${PORT}`);
});
