const mongoose= require('mongoose')
const modelUser = require('./modelUser')
const ProviderSchema=new mongoose.Schema({
    matricul:{
        type:String
    },
    company:{
        type:String
    },
    service:{
        type:String
    }
})
modelUser.discriminator("Provider",ProviderSchema)
module.exports= mongoose.model('Provider')