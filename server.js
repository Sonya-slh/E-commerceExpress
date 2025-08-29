const express = require('express');
const app = express();
const cors=require("cors")// autorisation l donees 
const dotenv = require('dotenv');
app.use(cors());
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
const CommandeRoute=require('./Routes/CommandeRoute')
app.use('/Commande',CommandeRoute)



const routeCostomer=require('./Routes/routeCostomer')
app.use('/Costomer',routeCostomer)
const routeProvider=require('./Routes/routeProvider')
app.use('/Provider',routeProvider)
const authentificationRoute=require('./Routes/authnetificationRoute')
app.use('/User',authentificationRoute)
app.get('/:img',(req,res)=>{
    res.sendFile(__dirname+"/my-uploads/"+req.params.img)
})
app.listen(port,()=>{
    console.log( `Listning to port on http://localhost:${port}` )
    
});