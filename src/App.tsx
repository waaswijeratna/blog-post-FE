import React, { useState } from "react";
import "./App.css";
import AuthDialog from "./components/authDialog";
import TinyEditor from "./components/TinyEditor";

function App() {
  const [content, setContent] = useState("");

  // Function to handle conversion
  const handleConvertToHTML = () => {
    alert(content); // Shows the HTML content in an alert
    console.log("Converted HTML:", content); // Logs the HTML content in the console
  };

  return (
    <>
      <AuthDialog />
      <p>www.google.com makes it to you</p>
      <p className="bg-red-500">works</p>
      <div style={{ padding: "20px" }}>
        <h2>React TinyMCE Editor</h2>
        <TinyEditor value={content} onChange={setContent} />
        
        {/* Convert to HTML Button */}
        <button 
          onClick={handleConvertToHTML} 
          style={{ marginTop: "10px", padding: "8px 15px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
        >
          Convert to HTML
        </button>
      </div>
    </>
  );
}

export default App;
