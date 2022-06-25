const router = require("express").Router();
const User = require("../models/User.model")
const {checkRol} = require("../middleware/customMiddleware")
const isLoggedIn = require("../middleware/isLoggedIn")


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//RUTAS PARA ADMIN                  //COLOCAR LOS ROLES PERMITIDOS
router.get("/admin/users",isLoggedIn,checkRol(["ADMIN","STAFF"]), (req, res, next) => {
 
                              //ocuptar contraseña
User.find({role:{$ne:"ADMIN"}},{password:0})

.then(users=>{
  console.log("users",users)
  res.render("listUser",{users})
})
.catch(error=>{
  next (error)
})



});

module.exports = router;
