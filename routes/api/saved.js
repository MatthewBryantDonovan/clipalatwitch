const router = require("express").Router();
const savedController = require("../../controllers/savedController");

// Matches with "/api/saved/streamer"
router.route("/streamer")
.post(savedController.saveStreamer);

// Matches with "/api/saved/game"
router.route("/game")
.post(savedController.saveGame);

// Matches with "/api/saved/clip"
router.route("/clip")
.post(savedController.saveClip);

// Matches with "/api/saved"
router.route("")
.get(savedController.userSavedInfo);

// Matches with "/api/saved/clips/:type/:id"
router.route("/clips/:type/:id")
.get(savedController.viewClips);

module.exports = router;