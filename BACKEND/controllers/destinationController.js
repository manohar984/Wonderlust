const Destination = require('../models/Destination');
const destinationsData = require('../destinationsData');
const mongoose = require('mongoose');

exports.getAllDestinations = async (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (!isMongoConnected) {
    console.log('MongoDB not connected. Serving in-memory fallback data.');
    return res.json({
      source: 'local_fallback',
      // data: data
    });
  }

  try {
    const destinations = await Destination.find({});
    res.json({
      source: 'mongodb',
      data: destinations
    });
  } catch (err) {
    console.error('Error fetching destinations:', err.message);
    res.status(500).json({
      error: 'Failed to retrieve destinations from database',
      fallback: destinationsData
    });
  }
};
