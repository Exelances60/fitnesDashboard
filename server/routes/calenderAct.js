const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const calenderActController = require("../controllers/calenderAct");

router.delete("/delete-act/:actId", isAuth, calenderActController.deleteAct);

module.exports = router;
