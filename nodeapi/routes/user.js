const express=require("express");
const {userById,allUsers,getUser,updateUser,deleteUser
    ,userPhoto,addFollowing,addFollower,removeFollowing,removeFollower,findPeople,hasAuthorization} =require("../controllers/user");
const {requireSignin} =require("../controllers/auth");


const router=express.Router();

router.put("/user/follow",requireSignin,addFollowing,addFollower);
router.put("/user/unfollow",requireSignin,removeFollowing,removeFollower)

router.get("/users",allUsers);
router.get("/users/:userId",requireSignin,getUser);
router.put("/users/:userId",requireSignin,hasAuthorization,updateUser);

router.delete("/users/:userId",requireSignin,hasAuthorization,deleteUser);
router.get("/user/photo/:userId",userPhoto);
router.get("/user/findpeople/:userId",requireSignin,findPeople);
//any route containing:userId,our app will execute first userById()

router.param("userId",userById);


module.exports=router;