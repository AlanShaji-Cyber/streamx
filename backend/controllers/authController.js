const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");


// REGISTER

const register = async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK USER EXISTS

    const checkSql =
      "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Database Error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User Already Exists",
        });
      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(password, 10);

      // INSERT USER

      const insertSql =
        "INSERT INTO users (email, password) VALUES (?, ?)";

      db.query(
        insertSql,
        [email, hashedPassword],
        (err, result) => {

          if (err) {
            return res.status(500).json({
              message: "Database Error",
            });
          }

          res.json({
            message: "Registration Success",
          });

        }
      );

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// LOGIN

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const sql =
      "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Database Error",
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "User Not Found",
        });
      }

      const user = result[0];

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
        { email: user.email },
        "streamxsecret",
        { expiresIn: "7d" }
      );

      res.json({
        token,
        message: "Login Success",
      });

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  register,
  login,
};