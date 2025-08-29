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
        Products:products._id
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
        if (!req.body) {
            return res.status(400).json({
                message: "No data provided to update the product",
            });
        }

        console.log("Product ID:", req.params.id); // Debug : Vérifiez l'ID
        console.log("Request body:", req.body); // Debug : Vérifiez les données envoyées

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
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
        console.error(error);
        res.status(500).json({
            message: "Failed to update product",
            error: error.message || error,
        });
    }
};


const getProduct = (async (req, res) => {
    try {
        const productGet = await productModel.findById({ _id: req.params.id })
        if (!productGet) {
            res.status(400).json({
                message: "Product not found"
            })
        }
        else {
            res.status(200).json({
                message: "Product found",
                data: productGet
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
    })
    const getProductBySubCatergory = async (req, res) => {
        try {
            console.log(req.params);  
    
            const { SubCategoryId} = req.params;
            console.log('Subcategory ID:', SubCategoryId);

    
            if (!SubCategoryId) {
                return res.status(400).json({
                    message: 'Sub-category ID is required'
                });
            }
    
            const subCategory = await modelSubCategory.findById(SubCategoryId);
    
            if (!subCategory) {
                return res.status(404).json({
                    message: 'Sub-category not found'
                });
            }
    
            const products = await productModel.find({ SubCategory: SubCategoryId }).populate('SubCategory', 'name');
    
            if (products.length === 0) {
                return res.status(404).json({
                    message: `No products found for sub-category: ${subCategory.name}`
                });
            }
    
            res.status(200).json({
                message: `Products for sub-category: ${subCategory.name}`,
                data: products
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'An error occurred while fetching products',
                error: error.message || error
            });
        }
    }
    
    
module.exports={createProducts,listProduct,deleteProduct,updateProduct,getProduct,getProductBySubCatergory}