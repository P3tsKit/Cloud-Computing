const { Storage } = require("@google-cloud/storage");
const path = require("path");

// Inisialisasi Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, "serviceaccountkey.json"), 
  projectId: "p3tskit-capstone-project", 
});

const bucketName = "p3tskit_uploads"; 
const bucket = storage.bucket(bucketName);

/**
 * Fungsi untuk mengunggah file ke Google Cloud Storage
 * @param {Buffer} fileBuffer - Buffer file dari multer
 * @param {string} fileName - Nama file asli
 * @returns {Promise<string>} - URL file yang diunggah
 */
const uploadToGCS = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(`${Date.now()}-${fileName}`); // Nama file unik
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      console.error("Gagal mengunggah ke GCS:", err);
      reject(err);
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(fileBuffer); // Mulai unggah file
  });
};

module.exports = uploadToGCS;
