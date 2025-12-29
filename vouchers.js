const mongoose = require('mongoose');
const voucher = require('./models/voucher');

require('dotenv').config();

const vouchers = [
    { brand: "Amazon", value: 200 },
    { brand: "Zomato", value: 100 },
    { brand: "Flipkart", value: 300 },
    { brand: "Myntra", value: 250 },
    { brand: "Swiggy", value: 150 }
];

const voucherDB = async () => {
    await mongoose.connect(process.env.MONGOURL);
    await voucher.deleteMany({}); 
    await voucher.insertMany(vouchers);
    console.log("Vouchers Seeded!");
    process.exit();
};

voucherDB();