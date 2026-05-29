const Destination = require('../models/Destination');
const destinationsData = require('../destinationsData');
const mongoose = require('mongoose');

exports.getAllDestinations = async (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (!isMongoConnected) {
    console.log('MongoDB not connected. Serving in-memory fallback data.');
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
    console.error('Error fetching destinations:', err.message);
    res.status(500).json({
      error: 'Failed to retrieve destinations from database',
      fallback: destinationsData
    });
  }
};

// Create a new destination
exports.createDestination = async (req, res) => {
  const destinationData = req.body;
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (!isMongoConnected) {
    return res.status(503).json({ error: 'Database connection offline. Cannot create destination.' });
  }

  try {
    const newDestination = new Destination(destinationData);
    await newDestination.save();
    console.log(`Saved destination ${newDestination.name} to MongoDB.`);
    res.status(201).json({
      success: true,
      data: newDestination
    });
  } catch (err) {
    console.error('Error creating destination:', err.message);
    res.status(500).json({ error: 'Failed to save destination to database.' });
  }
};

// Update an existing destination
exports.updateDestination = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (!isMongoConnected) {
    return res.status(503).json({ error: 'Database connection offline. Cannot update destination.' });
  }

  try {
    const updatedDest = await Destination.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedDest) {
      return res.status(444).json({ error: 'Destination not found.' });
    }
    console.log(`Updated destination ${updatedDest.name} in MongoDB.`);
    res.json({
      success: true,
      data: updatedDest
    });
  } catch (err) {
    console.error('Error updating destination:', err.message);
    res.status(500).json({ error: 'Failed to update destination in database.' });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  const { id } = req.params;
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (!isMongoConnected) {
    return res.status(503).json({ error: 'Database connection offline. Cannot delete destination.' });
  }

  try {
    const deletedDest = await Destination.findByIdAndDelete(id);
    if (!deletedDest) {
      return res.status(444).json({ error: 'Destination not found.' });
    }
    console.log(`Deleted destination ${deletedDest.name} from MongoDB.`);
    res.json({
      success: true,
      message: `Destination ${deletedDest.name} deleted successfully.`
    });
  } catch (err) {
    console.error('Error deleting destination:', err.message);
    res.status(500).json({ error: 'Failed to delete destination from database.' });
  }
};
