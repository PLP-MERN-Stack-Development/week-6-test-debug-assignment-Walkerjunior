import Bug from '../models/Bug.js';

// @desc    Get all bugs
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new bug
export const createBug = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBug = await Bug.create({ title, description });
    res.status(201).json(newBug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update bug status
export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a bug
export const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.status(200).json({ message: 'Bug deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
