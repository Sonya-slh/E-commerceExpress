const controllerProvider=require("../Controllers/controllerProvider")
const route=require("express").Router()
route.post("/add",controllerProvider.createProvider)
route.get("/list",controllerProvider.listProvider)
route.delete("/delete/:id",controllerProvider.deleteProvider)
module.exports=route;