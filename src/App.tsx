import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModeratorDashboard from "./pages/Dashboard/moderatorDashboard";
import CreateBlog from "./pages/Dashboard/createBlog";
import BlogDetail from "./pages/BlogDetail";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <ModeratorDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-Blog" 
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            } 
          />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
