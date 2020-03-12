const router = require("express").Router();
const usersRoutes = require("./user");

// User routes
router.use("/users", usersRoutes);

module.exports = router;
