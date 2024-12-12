const express = require("express");
const router = express.Router();
const { registerUser, loginUser, changePassword } = require("../controllers/userController");

const { verifyUser } = require("../middleware/auth");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change-password", verifyUser, changePassword);

// Mengetes server 
router.get("/test", (req, res) => {
  return res.send("ok"); // Mengirim respons yang benar
});

module.exports = router;
