const Animal = require('../models/Animal');

// Get all animals (PUBLIC)
const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().sort('-createdAt');
    res.json({ success: true, data: animals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add new animal (ADMIN ONLY)
const addAnimal = async (req, res) => {
  try {
    const { name, type, story, imageUrl, status } = req.body;
    
    // Validation
    if (!name || !type || !story || !imageUrl) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, type, story, and imageUrl',
      });
    }
    
    const animal = await Animal.create({
      name,
      type,
      story,
      imageUrl,
      status: status || 'in_care',
    });
    
    res.status(201).json({ success: true, data: animal });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete animal (ADMIN ONLY)
const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    
    if (!animal) {
      return res.status(404).json({ success: false, error: 'Animal not found' });
    }
    
    await animal.deleteOne();
    res.json({ success: true, message: 'Animal deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAnimals, addAnimal, deleteAnimal };