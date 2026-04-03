const express = require('express');
const router = express.Router();
const {
  getAllLeads,
  getLead,
  createLead,
  updateLeadStatus,
  addNote,
  deleteLead,
  updateLead,
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

// Apply protection middleware to all routes
router.use(protect);

// Routes
router.get('/', getAllLeads);
router.post('/', createLead);
router.get('/:id', getLead);
router.put('/:id', updateLead);
router.put('/:id/status', updateLeadStatus);
router.put('/:id/notes', addNote);
router.delete('/:id', deleteLead);

module.exports = router;
