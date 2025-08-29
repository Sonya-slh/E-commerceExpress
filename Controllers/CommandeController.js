const { response } = require("express");
const commandeModel = require("../Models/CommadModel");
const customerModel = require("../Models/modelCostomer");
const mongoose = require("mongoose");
module.exports = {
  createCommande: async (req, res) => {
    try {
        
      console.log("Données reçues du client : ", req.body);
  if (!req.body.order || !req.body.customer) {
    return res.status(400).json({ message: "Données manquantes" });
  }
      if (!mongoose.Types.ObjectId.isValid(req.body.customer)) {
        return res.status(400).json({
          success: false,
          message: "ID du client invalide",
          data: null,
        });
      }
      // Convertir l'ID du client en ObjectId
      const customerId = new mongoose.Types.ObjectId(req.body.customer);
      const commandeData = {
        ...req.body,
        customer: customerId,
        order: req.body.order.map((order) => ({
          ...order,
          product: new mongoose.Types.ObjectId(order.product), // Convertir l'ID du produit en ObjectId
        })),
      };
      const commande = await commandeModel(commandeData);
      await commande.save();
      res.status(200).json({
        success: true,
        message: "data created",
        data: commande,
      });
      await customerModel.findByIdAndUpdate(req.body.customer, {
        $push: { commande: commande },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "failed to create" + error,
        data: null,
      });
    }
  },
  getAllcommandes: async (req, res) => {
    try {
      const commande = await commandeModel.find();
      res.status(200).json({
        success: true,
        message: "commande found",
        data: commande,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "failed to find",
        data: null,
      });
    }
  },
  getCommandeById: async (req, res) => {
    try {
      const commandeId = req.params.id;
      const commande = await commandeModel.findById(commandeId);
      res.status(200).json({
        success: true,
        message: "commande found",
        data: commande,
      });
    } catch {
      res.status(400).json({
        success: false,
        message: "commande not found",
        data: null,
      });
    }
  },
  deleteCommande: async (req, res) => {
    try {
      const deleteCommande = req.params.id;
      const commande = await commandeModel.findByIdAndDelete(deleteCommande);
      res.status(200).json({
        success: true,
        message: "commande deleted",
        data: commande,
      });
    } catch {
      res.status(400).json({
        success: false,
        message: "commande not deleted",
        data: null,
      });
    }
  },
  updateCommande: async (req, res) => {
    try {
      const updateCommandeId = req.params.id;
      const commande = await commandeModel.findByIdAndUpdate(
        updateCommandeId,
        req.body,
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "commande updated",
        data: commande,
      });
    } catch {
      res.status(400).json({
        success: false,
        message: "update failed",
        data: null,
      });
    }
  },
};