const mongoose=require("mongoose")
const gallerySchema=new mongoose.Schema({
    Name:{
        type:String
    }
})
const productSchema=new mongoose.Schema({
    ref:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    qte:{
        type:Number
    },
    gallery:[
        gallerySchema
    ],
    SubCategory:{
         type:mongoose.Types.ObjectId,
         ref:"SubCategory"
    }
})
module.exports=mongoose.model('products',productSchema)