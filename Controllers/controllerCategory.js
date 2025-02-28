const modelCategory=require("../Models/modelCategory")
const createCategory=(async(req,res)=>{
    req.body.image=req.file?.filename
const category=new modelCategory(req.body)
await category.save(req.body,(error,item)=>{
    if (error){
        res.status(400).json({
            message:"Faile to create category",
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
})
const listCategory =(async(req,res)=>{
    try {
        const Category=await modelCategory.find()
        res.status(200).json({
            message: "Success",
            data:Category
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to get list",
            data:error
        })
        
    }
})
const deleteCategory=(async(req,res)=>{
    try {
        const Category=await modelCategory.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Success",
            data:Category
        });
    } catch (error) {
        res.status(400).json({
            message:"Failed",
            data:error
        });
        
    }
});
const updateCategory=(async(req,res)=>{
    try {
        const updateCategory= await modelCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new :true }

        );
        if(!updateCategory){
            return res.status(400).json({
                message:"Category not found",
        
            })
            
        }
        res.status(200).json({
            message:"Success to update category",
            data:updateCategory,
        })
        
    } catch (error) {
        res.status(400).json({
            message:"Failed to update category",
            data:error,
        })
        
    }
})
const deleteAllCategory=(async(req,res)=>{
    try {
        const Category= await modelCategory.deleteMany()
        res.status(200).json({
            message:"Success to delete",
            data:Category,
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to delete gategorys",
            data:error,
        })
    }
})
module.exports={createCategory,listCategory,deleteCategory,updateCategory,deleteAllCategory}