const router = require("express").Router();
const clipRiverController = require("../../controllers/clipRiverController");

// Matches with "/api/clipriver/getriver"
router.route("/getriver")
.get(clipRiverController.getRiver);

// Matches with "/api/clipriver/cliptype"
router.route("/cliptype")
.post(clipRiverController.clipType);


module.exports = router;
