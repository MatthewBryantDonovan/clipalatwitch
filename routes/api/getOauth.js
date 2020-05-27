/////////////////  Dependencies /////////////////
const router = require("express").Router();
const getOauthController = require("../../controllers/getOauthController");

// Matches with "/api/getOauth"
router.route("")
.post(getOauthController.getOauth);

// Exporting router
module.exports = router;