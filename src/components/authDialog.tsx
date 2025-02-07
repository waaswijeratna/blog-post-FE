import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const AuthDialog = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/signup`, { name, email, password });
      alert("Signup successful! Now login.");
    } catch (error) {
      alert("Signup failed!"+error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setToken(res.data.token);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed!"+error);
    }
  };

  return (
    <div>
      <h2>{token ? "Logged In" : "Login / Signup"}</h2>

      {!token && (
        <>
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignup}>Signup</button>
          <button onClick={handleLogin}>Login</button>
        </>
      )}

      {token && <button onClick={() => setToken(null)}>Logout</button>}
    </div>
  );
};

export default AuthDialog;
