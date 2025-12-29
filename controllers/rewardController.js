const mongoose = require("mongoose")
const Voucher = require("../models/voucher")
const Wallet = require("../models/wallet")
const RedeemedReward = require("../models/redeemReward")
const transaction = require("../models/transaction")



exports.redeemVoucher = async(req, res) => {
    const {voucherId} = req.params
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        //checking if voucher exists 
        const voucher = await Voucher.findById(voucherId)
        if(!voucher) {
            return res.status(400).send("Voucher not found")
        }
        //deducting voucher value from user's wallet
        const wallet = await Wallet.findOneAndUpdate(
            {userId : req.user.id, balance: { $gte: voucher.value}},
            { $inc: {balance: -voucher.value}},
            {session, new: true}
        )

        if(!wallet){
            return res.status(400).send({message:"Insufficient balance in your wallet!"})
        }

        //creating record for redeemed card
        await RedeemedReward.create([{
            userId : req.user.id,
            voucherId: voucher._id,
            voucherValue: voucher.value
        }],{session})

        // 4. Record the DEBIT Transaction
        await transaction.create([{
            userId: req.user.id,
            type: 'DEBIT',
            amount: voucher.value
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).send({ message: `Success! You redeemed a ${voucher.brand} voucher.` });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}