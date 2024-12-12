const { db } = require("../utils/firebase");

// Mendapatkan newsletter terbaru
const getNewsletter = async (req, res) => {
  try {
    const newsletterSnapshot = await db.collection("newsletters").get();

    if (newsletterSnapshot.empty) {
      return res.status(404).json({ message: "No newsletters found" });
    }

    const newsletters = newsletterSnapshot.docs.map((doc) => doc.data());
    res.status(200).json({ newsletters });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch newsletters", error: error.message });
  }
};

// Menambahkan newsletter baru
const addNewsletter = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNewsletter = {
      title,
      content,
      imageUrl,
      createdAt: new Date(),
    };

    const newsletterRef = await db.collection("newsletters").add(newNewsletter);
    res.status(201).json({ id: newsletterRef.id, ...newNewsletter });
  } catch (error) {
    res.status(500).json({ message: "Failed to add newsletter", error: error.message });
  }
};

module.exports = { getNewsletter, addNewsletter };
