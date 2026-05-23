const db = require("../config/db");

exports.addMovie = (req, res) => {
  const { title, description, genre, thumbnail, video_url } = req.body;

  const query =
    "INSERT INTO movies (title, description, genre, thumbnail, video_url) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [title, description, genre, thumbnail, video_url],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Movie added successfully"
      });
    }
  );
};
exports.getMovies = (req, res) => {
  const query = "SELECT * FROM movies";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

exports.deleteMovie = (req, res) => {
  const movieId = req.params.id;

  const query = "DELETE FROM movies WHERE id = ?";

  db.query(query, [movieId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Movie deleted successfully"
    });
  });
};

exports.updateMovie = (req, res) => {
  const movieId = req.params.id;

  const { title, description, genre } = req.body;

  const query =
    "UPDATE movies SET title=?, description=?, genre=? WHERE id=?";

  db.query(
    query,
    [title, description, genre, movieId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Movie updated successfully"
      });
    }
  );
};