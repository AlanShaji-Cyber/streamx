const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

const register = async (req, res) => {

  try {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email,
      password: hashedPassword,
    };

    users.push(user);

    res.json({
      message: "User Registered",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = users.find(
      (u) => u.email === email
    );

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

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