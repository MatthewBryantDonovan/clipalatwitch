/////////////////  Dependencies /////////////////
const router = require("express").Router();
const usersRoutes = require("./user");
const searchRoutes = require("./search");
const savedRoutes = require("./saved");
const clipRiverRoutes = require("./clipRiver");
const getOauthRoutes = require("./getOauth");

// User routes
router.use("/users", usersRoutes);
router.use("/search", searchRoutes);
router.use("/saved", savedRoutes);
router.use("/clipriver", clipRiverRoutes);
router.use("/getOauth", getOauthRoutes);

// Exporting router
module.exports = router;