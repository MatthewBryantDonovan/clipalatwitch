const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("passport");

// Matches with "/api/users/create"
router.route("/create")
.post(usersController.create);

// Matches with "/api/users/login"
router.route("/login")
.post(passport.authenticate('local', 
{
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}
));

// Matches with "/api/users/logout"
router.route("/logout")
.delete(usersController.logout)
.get(usersController.logout);

module.exports = router;
