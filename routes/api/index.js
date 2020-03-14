const router = require("express").Router();
const usersRoutes = require("./user");
const searchRoutes = require("./search");

// User routes
router.use("/users", usersRoutes);
router.use("/search", searchRoutes);

module.exports = router;
