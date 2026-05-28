const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");

const movieRoutes = require("./routes/movieRoutes");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://streamx-dun-theta.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));


// ROUTES
app.use("/api/movies", movieRoutes);

app.use("/api/auth", authRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});


const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});