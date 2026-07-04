const express = require('express');
const router = express.Router();
const { getAnimals, addAnimal, deleteAnimal } = require('../controllers/animalController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getAnimals);

// Admin only routes
router.post('/', protect, adminOnly, addAnimal);
router.delete('/:id', protect, adminOnly, deleteAnimal);

module.exports = router;