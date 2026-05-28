const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  destinationId: { type: String, required: true },
  destinationName: { type: String, required: true },
  durationDays: { type: Number, required: true },
  totalTravelers: { type: Number, required: true },
  // serviceLevel: { type: String, required: true },
  estimatedBudget: { type: Number, required: true },
  dateGenerated: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
