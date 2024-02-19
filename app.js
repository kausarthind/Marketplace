const path = require('path');
const express= require("express");
const cookieParser = require('cookie-parser');
const productRoute=require("./routes/productRoutes");
const app=express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Body parser, reading data from body into req.body
app.use(express.json({ limit:'10kb' }));
app.use(cookieParser());

// ROUTES
app.use('/api', productRoute);
app.use('/', (req, res) => {
    console.log(req);
    res.json(
        { message: "Welcome to DressStore application"}
    )
});

app.use('*', (req, res, next) => {
    res.status(404).json({
        status:'error',
        error: `Can't find ${req.originalUrl} on this server` 
    });
});

module.exports = app;