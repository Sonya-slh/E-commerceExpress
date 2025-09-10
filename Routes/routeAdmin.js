const controllerAdmin = require("../Controllers/controllerAdmin")
const verifyCsrf = require("../middleware/verifyCsrf")
const route=require("express").Router()
route.post('/add',controllerAdmin.createAdmin)
route.get('/list',verifyCsrf,controllerAdmin.listAdmin)
route.delete('/delete/:id',controllerAdmin.deleteAdmin)
module.exports=route;