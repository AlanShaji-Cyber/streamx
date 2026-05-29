const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");

const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");

// Store file in memory before sending to S3
const storage = multer.memoryStorage();
const upload = multer({ storage });

// UPLOAD MOVIE
router.post("/", upload.single("video"), async (req, res) => {
  try {
    const {
      title,
      genre,
      thumbnail,
      description,
    } = req.body;

    const fileName = `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const videoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    const sql = `
      INSERT INTO movies
      (title, genre, thumbnail, description, video_url)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        title,
        genre,
        thumbnail,
        description,
        videoUrl,
      ],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database Error",
          });
        }

        res.json({
          message: "Movie Uploaded Successfully",
          videoUrl,
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "S3 Upload Failed",
      error: error.message,
    });
  }
});

// GET MOVIES
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM movies",
    (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      res.json(results);
    }
  );
});

module.exports = router;