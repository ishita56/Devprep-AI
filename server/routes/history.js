const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Analysis.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;