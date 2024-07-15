const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const bodyParser = require('body-parser')
const path = require("path");
const app = express()
app.use(cors({
    origin : https://ankitstore.onrender.com,
    credentials : true
}))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/api",router)
app.use(express.static(path.join(__dirname, "build")));
app.use((_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// If user hits the route that donot exist
// we will shoe not found message
app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Not found!",
  });
});

const PORT = process.env.PORT||8080


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
