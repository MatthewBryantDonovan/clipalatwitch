const router = require("express").Router();
const usersRoutes = require("./user");

// User routes
router.use("/users", usersRoutes);

// router.get("/login", function (req, res) {
//     res.redirect("/register");
// });

module.exports = router;
