const controllerCostomer=require("../Controllers/controllerCostomer")
const downloadFile=require("../middleware/downloadFile")
const route=require("express").Router()
route.post("/add",downloadFile.single("image"),controllerCostomer.createCostomer)
route.get("/list",controllerCostomer.listCostomer)
route.delete("/delete/:id",controllerCostomer.deleteCostomer)
module.exports=route;