const { loginUser, verifyed, forgetPass,resetpass, logoutUser,profil} = require("../Controllers/authentification");
const authentification = require("../middleware/authentification");
const route = require("express").Router();
route.post('/login',loginUser);
route.get('/verify/:codeVerification',verifyed)
route.post('/forgetPassword',forgetPass)
route.post('/resetpass/:token',resetpass)
route.post('/logout',logoutUser)
route.get('/profil/:id',authentification,profil)
module.exports = route;

