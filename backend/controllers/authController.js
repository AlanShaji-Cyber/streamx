const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {

  try {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (email, password) VALUES (?, ?)";

    db.query(
      sql,
      [email, hashedPassword],
      (err, result) => {

        if (err) {
          return res.status(500).json({
            message: "Registration Failed",
          });
        }

        res.json({
          message: "User Registered",
        });

      }
    );

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const sql =
      "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

      if (err) {
        return res.status(500).json({
          message: "Server Error",
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "User Not Found",
        });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(
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

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  register,
  login,
};