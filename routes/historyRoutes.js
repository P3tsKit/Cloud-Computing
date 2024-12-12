const express = require("express");
const { getHistory } = require("../controllers/historyController");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

router.get("/history", verifyUser, getHistory);

module.exports = router;
