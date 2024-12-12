const { db } = require("../utils/firebase");
const axios = require("axios");
const FormData = require("form-data");
const { API_ML_URL } = require("../utils/GlobalVariable");
const uploadToGCS = require("../utils/storage");

const diagnose = async (req, res) => {
  try {
    console.log("File Info:", req.file); // Log untuk debugging
    const diagnose = await getDiagnoseFromMlServices(req.file);
    const publicUrl = await uploadToGCS(req.file.buffer, req.file.originalname);
    diagnose.image_url = encodeURI(publicUrl);

    diagnose.user_id = req.user.user_id;
    diagnose.createdAt = Date.now();

    console.log("Diagnose Info:", diagnose); // Log untuk debugging
    await db.collection("diagnoses").add(diagnose);

    res.status(200).json(diagnose);
  } catch (error) {
    console.error("Diagnose Error:", error); // Log error
    res.status(500).json({ message: "Failed to fetch diagnose", error: error.message });
  }
};

const getDiagnoseFromMlServices = async (file) => {
  const url = API_ML_URL + "/predict";
  const formData = new FormData();
  formData.append("file", file.buffer, file.originalname); // Gunakan buffer

  try {
    let res = await axios.post(url, formData, {
      headers: formData.getHeaders(),
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

module.exports = { diagnose };
