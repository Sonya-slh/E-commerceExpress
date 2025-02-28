const controllerAdmin=require("../Controllers/controllerAdmin")
const route=require("express").Router()
route.post('/add',controllerAdmin.createAdmin)
route.get('/list',controllerAdmin.listAdmin)
route.delete('/delete/:id',controllerAdmin.deleteAdmin)
module.exports=route;