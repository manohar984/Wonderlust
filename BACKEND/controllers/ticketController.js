const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');

// Save a ticket
exports.createTicket = async (req, res) => {
  const ticketData = req.body;
  const isMongoConnected = mongoose.connection.readyState === 1;

  // Basic validation
  if (!ticketData.ticketNumber || !ticketData.name || !ticketData.email) {
    return res.status(400).json({ error: 'Missing required ticket fields (ticketNumber, name, email).' });
  }

  if (!isMongoConnected) {
    console.log('MongoDB not connected. Simulating ticket save (local only).');
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
    console.log(`Saved ticket ${ticketData.ticketNumber} to MongoDB.`);
    res.status(201).json({
      success: true,
      savedToDb: true,
      data: newTicket
    });
  } catch (err) {
    console.error('Error saving ticket to MongoDB:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to save ticket to database',
      fallbackData: ticketData
    });
  }
};

// Get all saved tickets
exports.getAllTickets = async (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;

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
    console.error('Error fetching tickets:', err.message);
    res.status(500).json({ error: 'Failed to retrieve tickets from database' });
  }
};
