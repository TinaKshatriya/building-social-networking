const express=require("express");
const {getPosts,createPost,postsByUser,postById,isPoster,deletePost,updatePost,photo,
singlePost,like,unlike,comment,uncomment} =require("../controllers/post");
const {requireSignin} =require("../controllers/auth");
const {userById} =require("../controllers/user");
const {createPostValidator}=require("../validator");

const router=express.Router()

router.get("/posts",getPosts);
//like/unlike
router.put("/post/like",requireSignin,like);
router.put("/post/unlike",requireSignin,unlike);

//comment/uncomment

router.put("/post/comment",requireSignin,comment);
router.put("/post/uncomment",requireSignin,uncomment);


router.post("/post/new/:userId",requireSignin,createPost,createPostValidator);
router.get("/post/:postId",singlePost);
router.get("/posts/by/:userId",requireSignin,postsByUser);
router.delete("/posts/:postId",requireSignin,isPoster,deletePost);
router.put("/post/:postId",requireSignin,isPoster,updatePost);

router.get("/post/photo/:postId",photo);

//any route containing:userId,our app will execute first userById()

router.param("userId",userById);
//any route containing:postId,our app will execute first postById()

router.param("postId",postById);




module.exports=router;


