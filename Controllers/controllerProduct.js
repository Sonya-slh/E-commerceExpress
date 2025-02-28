const productModel=require("../Models/modelProduct")
const modelSubCategory = require("../Models/modelSubCategory")
const createProducts=(async(req,res)=>{
    req.body["gallery"]=req.files.length<=0
    ?[]:req.files.map((file)=>{
        return{
            Name:file.filename
        }
    });


const products=new productModel(req.body)
await products.save(req.body,(error,item)=>{
    if (error){
        res.status(400).json({
            message:"Failed to create model",
            data:error
        });
    }
    else{
        res.status(200).json({
            message:"success",
            data:item
        });
    }
    
});
await modelSubCategory.findByIdAndUpdate(req.body.SubCategory,{
    $push:{
        Products:products
    }
});
});
const listProduct =(async(req,res)=>{
    try {
        const products= await productModel.find()
        res.status(200).json({
            message:"Success",
            data: products


        });
    }
        
     catch (error) {
        res.send(400).json({
            message:"Failed",
            data:error
        });
        
    }
        
    

});
const deleteProduct=(async(req,res)=>{
    try { 
        const products=await productModel.findByIdAndDelete
        ({_id:req.params.id})
        res.status(200).json({
            message:"success",
            data:products
        });
        
    } catch (error) {
        res.status(400).json({
        message:"Failed",
        data:error
    });
        
    }
});

const updateProduct = async (req, res) => {
    try {
        req.body["gallery"]=req.files.length<=0
        ?req.files.filename:req.files.map((file)=>{
            return{
                Name:file.filename
            }
        });
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
            
        );
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update product",
            data: error,
        });
    }
};
module.exports={createProducts,listProduct,deleteProduct,updateProduct}