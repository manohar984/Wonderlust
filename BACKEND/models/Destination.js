const mongoose = require('mongoose');

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

module.exports = mongoose.model('Destination', DestinationSchema);
