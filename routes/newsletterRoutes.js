const express = require("express");
const { getNewsletter, addNewsletter } = require("../controllers/newsletterController");
const { verifyUser } = require("../middleware/auth"); 
const router = express.Router();

// Mendapatkan Newsletter
router.get("/newsletter", getNewsletter);

module.exports = router;
