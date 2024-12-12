const { db } = require("../utils/firebase");

// Mendapatkan Riwayat Hasil Diagnosa Sebelumnya
const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const historySnapshot = await db.collection("diagnoses").where("user_id", "==", req.user.user_id).get();

    if (historySnapshot.empty) {
      return res.status(404).json({ message: "No history found" });
    }

    const history = historySnapshot.docs.map((doc) => doc.data());
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history", error: error.message });
  }
};

module.exports = { getHistory };
