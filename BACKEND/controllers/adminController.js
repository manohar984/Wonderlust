const User = require('../models/User');
const Destination = require('../models/Destination');
const Ticket = require('../models/Ticket');

// Get overall application stats
exports.getStats = async (req, res) => {
  try {
    const totalDestinations = await Destination.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const totalUsers = await User.countDocuments();

    // Calculate total revenue from tickets
    const tickets = await Ticket.find({});
    const totalRevenue = tickets.reduce((sum, ticket) => sum + (ticket.estimatedBudget || 0), 0);

    res.json({
      success: true,
      stats: {
        totalDestinations,
        totalTickets,
        totalUsers,
        totalRevenue
      }
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err.message);
    res.status(500).json({ error: 'Server error fetching administrator statistics.' });
  }
};

// Get list of all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      users
    });
  } catch (err) {
    console.error('Error fetching user list:', err.message);
    res.status(500).json({ error: 'Server error fetching users list.' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Optional check: Don't allow admins to delete themselves
    if (req.user && req.user.id === userId) {
      return res.status(400).json({ error: 'Access denied. You cannot delete your own admin account.' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(444).json({ error: 'User not found.' });
    }

    console.log(`Admin deleted user account: ${deletedUser.username}`);
    res.json({
      success: true,
      message: `User ${deletedUser.username} deleted successfully.`
    });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ error: 'Server error deleting user.' });
  }
};
