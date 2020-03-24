/////////////////  Dependencies /////////////////
const router = require("express").Router();
const apiRoutes = require("./api");

// All API Routes
router.use("/api", apiRoutes);

// Exporting router
module.exports = router;