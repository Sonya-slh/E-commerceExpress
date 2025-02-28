const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const port= process.env.port

const database=require("./db")
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Bienvenu")
});
const routeCategory=require('./Routes/routeCategory')
app.use('/Category',routeCategory)
const routeSubCategory=require('./Routes/routeSubCategory')
app.use('/SubCategory',routeSubCategory)
const routeProduct=require('./Routes/routeProduct')
app.use('/products',routeProduct)


const routeAdmin=require('./Routes/routeAdmin')
app.use('/Admin',routeAdmin)



const routeCostomer=require('./Routes/routeCostomer')
app.use('/Costomer',routeCostomer)
const routeProvider=require('./Routes/routeProvider')
app.use('/Provider',routeProvider)
const authentificationRoute=require('./Routes/authnetificationRoute')
app.use('/User',authentificationRoute)
app.listen(port,()=>{
    console.log( `Listning to port on http://localhost:${port}` )
});