// import express from "express";

// const router = express.Router();

// const isAuthenticated = (req,res,next)=>{
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/auth/login");
// };

// router.get("/profile",isAuthenticated,(req,res)=>{
//     res.render("profile",{
//         user:req.user,
//     });
// })

// export default router;