const mongoose= require("mongoose");
const db= process.env.db
const database= mongoose.connect(db,
    (error)=>{
        if(!error){
            console.log("Connected successful")
        }
        else{
            console.log("Connected failed")
        }
    }
)
module.exports=database