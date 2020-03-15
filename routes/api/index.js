const router = require("express").Router();
const usersRoutes = require("./user");
const searchRoutes = require("./search");
const savedRoutes = require("./saved");

// User routes
router.use("/users", usersRoutes);
router.use("/search", searchRoutes);
router.use("/saved", savedRoutes);

module.exports = router;
