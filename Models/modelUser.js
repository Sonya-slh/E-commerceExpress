const mongoose =require('mongoose')
const options = { discriminatorKey: 'kind' };
const userSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    codeVerification:{
        type:String
    },
    verify:{
        type:Boolean,
        default:true
    },
    resetpass:{
        type:String
    }
},options)
module.exports= mongoose.model('User',userSchema)