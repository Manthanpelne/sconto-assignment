const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  value: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Voucher', VoucherSchema);