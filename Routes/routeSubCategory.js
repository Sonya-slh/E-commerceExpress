const controllerSubCategory=require("../Controllers/controllerSubCategory")
const validate_attribut = require("../middleware/validate_attribut")
const route=require('express').Router()
route.post("/add",validate_attribut(["Name","description"]),controllerSubCategory.createSubCategory)
route.get("/list",controllerSubCategory.listSubCategory)
route.delete("/delete/:id",controllerSubCategory.deleteAllSubCategory)
route.delete("/deleteAll",controllerSubCategory.deleteAllSubCategory)
route.put("/update/:id",controllerSubCategory.updateSubCategory)
module.exports=route;
