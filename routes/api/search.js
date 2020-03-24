/////////////////  Dependencies /////////////////
const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/search/streamer/:streamer"
router.route("/streamer/:streamer")
.get(searchController.searchStreamer);

// Matches with "/api/search/game/:game"
router.route("/game/:game")
.get(searchController.searchGame);

// Exporting router
module.exports = router;