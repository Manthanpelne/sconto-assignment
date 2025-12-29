const express = require("express")
const app = express()
require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const walletRoutes = require("./routes/walletRoutes")
const rewardRoutes = require("./routes/rewardRoutes")
const connection = require("./config/db")
const logger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorHandler")


//middlewares
app.use(express.json())
app.use(logger)


//routess
app.use("/api/auth", authRoutes)
app.use("/api/wallet", walletRoutes)
app.use('/api/rewards',rewardRoutes)


app.use(errorHandler)


app.listen(process.env.port,async()=>{
    connection()
    console.log(`server running on port:${process.env.port}`)
})