const mongoose = require("mongoose")
const Wallet = require("../models/wallet");
const transaction = require("../models/transaction");


// GET wallet details , Returns balance and last 5 transactions
exports.getWalletDetails = async(req,res) =>{
    try {
        const wallet = await Wallet.findOne({userId: req.user.id})
        const history = await transaction.find({ userId: req.user.id })
            .sort({ timestamp: -1 })
            .limit(5);

        res.json({
            balance: wallet.balance,
            recentTransactions: history
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// wallet - add money to wallet
exports.addMoney = async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Updating Wallet Balance
        const wallet = await Wallet.findOneAndUpdate(
            { userId: req.user.id },
            { $inc: { balance: amount } },
            { session, new: true }
        );

        // 2. Creating Transaction Record
        await transaction.create([{
            userId: req.user.id,
            type: 'CREDIT',
            amount: amount
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.json({ message: `₹${amount} added successfully`, newBalance: wallet.balance });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};



