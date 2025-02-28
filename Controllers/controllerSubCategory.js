const modelCategory = require("../Models/modelCategory")
const modelSubCategory=require("../Models/modelSubCategory")
const createSubCategory=(async(req,res)=>{
const SubCategory=new modelSubCategory(req.body)
await SubCategory.save(req.body,(error,item)=>{
    if (error){
        res.status(400).json({
            message:"Faile to create Subcategory",
            data:error
        })
    }
    else{
        res.status(200).json({
            message:"Success",
            data:item
        })
    }
    
})
await modelCategory.findByIdAndUpdate(req.body.Category,{
    $push:{
        SubCategorys:SubCategory
    }
})

})
const listSubCategory =(async(req,res)=>{
    try {
        const SubCategory=await modelSubCategory.find()
        res.status(200).json({
            message: "Success",
            data:SubCategory
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to get list",
            data:error
        })
        
    }
})
const deleteSubCategory=
(async(req,res)=>{
    try {
        const SubCategory=await modelSubCategory.findByIdAndDelete({_id:req.params._id})
        res.status(200).json({
            message:"Success",
            data:SubCategory
        });
    } catch (error) {
        res.status(400).json({
            message:"Failed",
            data:error
        });
        
    }
});
const updateSubCategory=(async(req,res)=>{
    try {
        const updateSubCategory= await modelSubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new :true }

        );
        if(!updateSubCategory){
            return res.status(400).json({
                message:"SubCategory not found",
        
            })
            
        }
        res.status(200).json({
            message:"Success to update Subcategory",
            data:updateSubCategory,
        })
        
    } catch (error) {
        res.status(400).json({
            message:"Failed to update Subcategory",
            data:error,
        })
        
    }
})
const deleteAllSubCategory=(async(req,res)=>{
    try {
        const SubCategory= await modelSubCategory.deleteMany()
        res.status(200).json({
            message:"Success to delete",
            data:SubCategory,
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to delete Subcategorys",
            data:error,
        })
    }
})
module.exports={createSubCategory,listSubCategory,updateSubCategory,deleteSubCategory,deleteAllSubCategory}