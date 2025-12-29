const mongoose = require('mongoose');

const RedeemedRewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // Index 3
  voucherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', required: true },
  voucherValue: { type: Number, required: true },
  redeemedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RedeemedReward', RedeemedRewardSchema);