import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/google/login",
  passport.authenticate("google", { scope: [["email"], ["profile"]] }),
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),(req, res) => {
     
    res.render("profile");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

export default router;
