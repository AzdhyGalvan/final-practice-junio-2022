const router = require("express").Router();
const User = require ("../models/User.model")
const fileUploader = require("../config/cloudinary.config")
/* GET home page */
router.get("/edit-myUser", (req, res, next) => {
    // sacar al current user del request que fue almacenado gracias a express-session

    const {user}= req.session
  res.render("user/edit-user",user);

});

router.post("/edit-myUser",fileUploader.single('profile_pic'), (req,res,next)=>{
    
    let profile_pic;
    if (req.file){
        profile_pic= req.file.path
    }
    console.log("req.file",req.file)
    const {role,... restUser} = req.body
    const {user} = req.session

    User.findByIdAndUpdate(user._id,{...restUser,profile_pic},{new:true})
    .then(updatedUser=>{
        let userWithoutPass = user.toObject()
        delete userWithoutPass.password

        //sobrescribir el user current req.session
        req.session.user = updatedUser
        res.redirect("/user/my-profile")
    })
    .catch(error=>{
        next (error)
    })


})

router.get("/my-profile", (req, res, next) => {
    // sacar al current user del request que fue almacenado gracias a express-session

    const {user}= req.session
  res.render("user/profile",user);

});


module.exports = router;