const router = require("express").Router();
const usersRoutes = require("./user");

// Book routes
router.use("/users", usersRoutes);

module.exports = router;
