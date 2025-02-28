const mongoose= require('mongoose')
const modelUser = require('./modelUser')
const CostomerSchema=new mongoose.Schema({
    image:{
        type:String
    },
    addresse:{
        type:String
    },
    city:{
        type:String
    },
    cin:{
        type:Number
    }
})
modelUser.discriminator("Costomer",CostomerSchema)
module.exports= mongoose.model('Costomer')