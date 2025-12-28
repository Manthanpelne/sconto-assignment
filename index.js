const express = require("express")
const app = express()
require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const connection = require("./config/db")
const logger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorHandler")


//middlewares
app.use(express.json())
app.use(logger)

//routess
app.use("/api/auth", authRoutes)


app.use(errorHandler)



app.listen(process.env.port,async()=>{
    connection()
    console.log(`server running on port:${process.env.port}`)
})