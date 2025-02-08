import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModeratorDashboard from "./pages/Dashboard/moderatorDashboard";
import CreateBlog from "./pages/Dashboard/createBlog";
import BlogDetail from "./pages/BlogDetail"; // Import the new page


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<ModeratorDashboard />} />
          <Route path="/create-Blog" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> {/* ✅ New route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
