const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const calenderActController = require("../controllers/calenderAct");

router.get("/get-act/:customerId", isAuth, calenderActController.getAct);

module.exports = router;
