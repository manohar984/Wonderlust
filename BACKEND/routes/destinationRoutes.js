const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', destinationController.getAllDestinations);

// Protected Admin Routes to manage destinations
router.post('/', authMiddleware, adminMiddleware, destinationController.createDestination);
router.put('/:id', authMiddleware, adminMiddleware, destinationController.updateDestination);
router.delete('/:id', authMiddleware, adminMiddleware, destinationController.deleteDestination);

module.exports = router;
