import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth?.user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://blog-post-bxf2hxd0ejgsazf0.eastasia-01.azurewebsites.net/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        auth?.login(data.token, data.user);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed. Try again."+error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md mb-3" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md mb-3" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full bg-purple-700 text-white py-2 rounded-md mt-2 hover:bg-purple-800"
        >
          Login
        </motion.button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <span className="text-purple-600 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
