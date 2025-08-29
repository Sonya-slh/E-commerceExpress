const controllerProduct=require("../Controllers/controllerProduct")
const validate_attribut = require("../middleware/validate_attribut")

const downloadFile = require("../middleware/downloadFile")
const route=require('express').Router()
route.get('/listId/:id' , controllerProduct.getProductBySubCatergory)
route.post("/add",downloadFile.array("gallery"),validate_attribut(["price","description","gallery","qte","ref"]),controllerProduct.createProducts)
route.get("/list",controllerProduct.listProduct)
route.delete("/delete/:id",controllerProduct.deleteProduct)
route.put("/update/:id",downloadFile.array("gallery"),controllerProduct.updateProduct)
route.get("/get/:id",controllerProduct.getProduct)
module.exports=route;