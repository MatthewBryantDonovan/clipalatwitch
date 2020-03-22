const router = require("express").Router();
const clipRiverController = require("../../controllers/clipRiverController");

// Matches with "/api/clipriver/getriver"
router.route("/getriver")
.get(clipRiverController.getRiver);


module.exports = router;
