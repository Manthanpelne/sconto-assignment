const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const protect = require('../middlewares/authMiddleware');

// POST /api/rewards/redeem/:voucherId
router.post('/redeem/:voucherId',protect, rewardController.redeemVoucher);

module.exports = router;