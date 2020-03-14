const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/search/streamer/:streamer"
router.route("/streamer/:streamer")
.get(searchController.streamer);

// Matches with "/api/search/game/:game"
router.route("/game/:game")
.get(searchController.game);

module.exports = router;
