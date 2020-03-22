const router = require("express").Router();
const usersRoutes = require("./user");
const searchRoutes = require("./search");
const savedRoutes = require("./saved");
const clipRiver = require("./clipRiver");

// User routes
router.use("/users", usersRoutes);
router.use("/search", searchRoutes);
router.use("/saved", savedRoutes);
router.use("/clipriver", clipRiver);

module.exports = router;
