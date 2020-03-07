const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users/create"
router.route("/create")
.post(usersController.create);

// Matches with "/api/users/login"
router.route("/login")
.post(usersController.userLogin);

module.exports = router;
