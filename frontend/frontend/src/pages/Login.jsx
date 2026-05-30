import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    try {

      if (isLogin) {

        const res = await axios.post(
          "http://13.207.185.193:5001/api/auth/login",
          formData
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert("Login Success");

        navigate("/home");

      } else {

        await axios.post(
          "http://13.207.185.193:5001/api/auth/register",
          formData
        );

        alert("Registration Success");

        setIsLogin(true);

      }

    } catch (error) {

      console.log(error);

      alert("Authentication Failed");

    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center text-white">

      <div className="bg-zinc-900 p-10 rounded-3xl w-[400px]">

        <h1 className="text-5xl font-bold text-purple-500 mb-10 text-center">
          StreamX
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-black outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-4 rounded-xl bg-black outline-none"
          />

          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl font-bold"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <p
            onClick={() => setIsLogin(!isLogin)}
            className="text-center text-zinc-400 cursor-pointer hover:text-purple-500"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;