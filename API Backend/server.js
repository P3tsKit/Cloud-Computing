const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");
const diagnoseRoutes = require("./routes/diagnoseRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const { getUserData } = require("./utils/firebase");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rute
app.use("/", userRoutes);
app.use("/", historyRoutes);
app.use("/", diagnoseRoutes);
app.use("/", newsletterRoutes);

app.get("/", (req, res) => {
  return res.send("Service Available"); // Mengirim respons yang benar
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
