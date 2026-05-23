const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },

});

const upload = multer({ storage });


// UPLOAD MOVIE

router.post("/", upload.single("video"), (req, res) => {

  const { title, genre, thumbnail } = req.body;

  const video = req.file.filename;

  const sql = `
    INSERT INTO movies
    (title, genre, thumbnail, video_url)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, genre, thumbnail, video],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      res.json({
        message: "Movie Uploaded Successfully",
      });
    }
  );
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