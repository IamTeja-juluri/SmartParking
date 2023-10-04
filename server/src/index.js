const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig }=require('./config');
const cookieParser = require('cookie-parser')
const cors= require('cors');
const apiRoutes=require('./routes')
const app=express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 30 // Limit each IP to 3 requests per `window` (here, per 2 minutes)
})


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
// Apply the rate limiting middleware to all requests
app.use(limiter)    
app.use('/api',apiRoutes)


app.listen(ServerConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT :${ServerConfig.PORT}`);
});

