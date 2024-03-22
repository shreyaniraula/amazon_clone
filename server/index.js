require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes.js');
const adminRouter = require('./routes/admin.routes.js');
const productRouter = require('./routes/product.routes.js');
const userRouter = require('./routes/user.routes.js');

//init
const PORT = 3000;
const app = express();

//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

const DB = process.env.MONGODB_URI
// connection
mongoose.connect(DB).then(()=>{
    console.log("Connection successful.");
}).catch((e)=>{
    console.log(e);
});

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Connected to PORT ${PORT}`);
});