const CommandeController=require("../Controllers/CommandeController")
const express = require("express")
const route=express.Router();
route.post('/add',CommandeController.createCommande)
route.get('/list',CommandeController.getAllcommandes)
route.get('.list/:id',CommandeController.getCommandeById)
module.exports= route
