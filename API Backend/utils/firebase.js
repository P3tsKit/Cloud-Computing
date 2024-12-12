const admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
const path = require("path");

// Tentukan path ke file kredensial service account
const serviceAccount = path.join(__dirname, "serviceaccountkey.json");

const getUserByEmail = async (email) => {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "=", email).get();
  let user;
  if (snapshot.size != 1) return null;
  snapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
};

// Inisialisasi Firebase Admin SDK dengan service account key
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://p3tskit-capstone-project.firebaseio.com",
});

// Mendapatkan referensi ke Firestore dan Auth
const db = getFirestore();
const auth = getAuth();

module.exports = { db, auth };
