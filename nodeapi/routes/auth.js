const express=require("express");
const {signup,signin,signout,forgotPassword,resetPassword} =require("../controllers/auth");
const {userById} =require("../controllers/user");
const {userSignupValidator,passwordResetValidator}=require("../validator");

const router=express.Router();


router.post("/signup",userSignupValidator,signup);
router.post("/signin",signin);
//signout
router.get("/signout",signout);

//any route containing:userId,our app will execute first userById()

router.param("userId",userById);
    // import from controllers/auth
    // these methods you will create next in controllers/auth
    
     
     
    // password forgot and reset routes
    router.put("/forgot-password", forgotPassword);
    router.put("/reset-password", passwordResetValidator, resetPassword);


module.exports=router;
