import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth?.user, navigate]);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      if (response.ok) {
        auth?.login(data.token, data.user);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Signup failed. Try again." + error);
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
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="text" placeholder="Name" className="w-full p-2 border rounded-md mb-3" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          className="w-full bg-purple-700 text-white py-2 rounded-md mt-2 hover:bg-purple-800"
        >
          Signup
        </motion.button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <span className="text-purple-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
