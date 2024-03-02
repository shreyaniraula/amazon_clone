require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.js');

//init
const PORT = 3000;
const app = express();

//middleware
app.use(express.json());
app.use(authRouter);

const DB = process.env.MONGODB_URI
// connection
mongoose.connect(DB).then(()=>{
    console.log("Connection successful.");
}).catch((e)=>{
    console.log(e);
});

app.listen(PORT, ()=>{
    console.log(`Connected to PORT ${PORT}`);
});