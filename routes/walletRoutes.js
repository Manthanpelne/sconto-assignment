const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const protect = require('../middlewares/authMiddleware');


router.get('/', protect, walletController.getWalletDetails);
router.post('/add-money', protect, walletController.addMoney);


module.exports = router;