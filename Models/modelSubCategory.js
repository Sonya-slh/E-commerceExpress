const mongoose =require('mongoose')
const SubcategorySchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Description:{
        type:String
    },
    Category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    Products:[{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }]
})
module.exports= mongoose.model('SubCategory',SubcategorySchema)