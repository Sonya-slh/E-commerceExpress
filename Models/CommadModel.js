const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  quantity: { type: Number },
  price: { type: Number },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
});
const commandeSchema = new mongoose.Schema({
  date: { type: String },
  etat: { type: String },
  lieuLivraison: { type: String },
  typeLivraison: { type: String },
  deliveryPrice: { type: Number },
  priceTotal:{type:Number},
  order: [orderSchema],
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "customer",
  },
});
module.exports = mongoose.model("commande", commandeSchema);