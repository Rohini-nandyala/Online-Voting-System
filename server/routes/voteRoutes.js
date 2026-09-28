const express = require('express');
const router = express.Router();
const { castVote, getMyVoteReceipt, checkVoterStatus, getLiveResults } = require('../controllers/voteController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/cast', protect, castVote);
router.get('/my-receipt/:electionId', protect, getMyVoteReceipt);
router.get('/status/:electionId', protect, checkVoterStatus);
// Only authorized Admin can inspect live vote results and tallies
router.get('/results/:electionId', protect, authorize('admin'), getLiveResults);

module.exports = router;
