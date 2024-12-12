const express = require("express");
const { diagnose } = require("../controllers/diagnoseController");
const { verifyUser } = require("../middleware/auth");
const multer = require("multer");
const uploadToGCS = require("../utils/storage"); // Import fungsi utilitas

const router = express.Router();

const multerMiddleware = multer({
  storage: multer.memoryStorage(), // Simpan di memori sementara
});

router.post("/diagnose", verifyUser, multerMiddleware.single("file"), diagnose);

module.exports = router;
