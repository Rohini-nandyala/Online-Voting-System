const express = require('express');
const router = express.Router();
const { getBlocksByElection, verifyBlockchainIntegrity } = require('../controllers/blockchainController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Only authorized Admin can inspect raw blockchain blocks & ledger verification
router.get('/blocks/:electionId', protect, authorize('admin'), getBlocksByElection);
router.get('/verify/:electionId', protect, authorize('admin'), verifyBlockchainIntegrity);

module.exports = router;
