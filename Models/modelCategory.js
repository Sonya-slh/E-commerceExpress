const mongoose =require('mongoose')
const categorySchema=new mongoose.Schema({
    Name:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    SubCategorys:[{
       type:mongoose.Types.ObjectId,
       ref:"SubCategory" 
    }]
})
module.exports= mongoose.model('Category',categorySchema)