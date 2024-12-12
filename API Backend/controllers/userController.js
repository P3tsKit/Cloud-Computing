const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db, auth } = require("../utils/firebase");
const { sendEmail } = require("../services/mailService");
const { nanoid } = require("nanoid");

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Mengecek email apakah sudah ada atau belum
    const userSnapshot = await db.collection("users").where("email", "==", email).get();
    if (!userSnapshot.empty) {
      return res.status(409).json({ message: "The email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Menyimpan data user di Firestore
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const userRef = await db.collection("users").add(newUser);

    res.status(201).json({ id: userRef.id, ...newUser });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Memvalidasi input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // Mencari user melalui email
    const userSnapshot = await db.collection("users").where("email", "==", email).get();
    if (userSnapshot.empty) {
      return res.status(401).json({ message: "Email not Exist!" });
    }

    const user = userSnapshot.docs[0].data();

    // Mencocokkan password
    if (await bcrypt.compare(password, user.password)) {
      // Membuat JWT token
      const token = jwt.sign({ user_id: userSnapshot.docs[0].id, email }, process.env.SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Wrong Password!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Mengganti password
const changePassword = async (req, res) => {
  try {
    const { new_password } = req.body;

    if (!new_password) {
      return res.status(400).json({ message: "All inputs are required" });
    }

    // Mencari reset token in Firestore
    const userSnapshot = await db.collection("users").where("email", "==", req.user.email).get();

    const userRef = userSnapshot.docs[0].ref;

    if (userRef.empty) {
      return res.status(400).json({ message: "User not Found!" });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Mengupdate password terbaru user
    await userRef.update({ password: hashedPassword });

    res.status(200).json({ message: "Password successfully updated" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
