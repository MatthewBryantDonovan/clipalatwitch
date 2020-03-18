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

// Matches with "/api/saved/delete/:type/:id"
router.route("/delete/:type/:id")
.post(savedController.removeStreamerOrGame)

module.exports = router;

// numberframes = base(window.Sizzle / 320 )

// frames = numberframes