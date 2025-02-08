import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // For accessing passed data
import TinyEditor from "../../components/TinyEditor";
import ThumbnailUpload from "../../components/ThumbnailUpload";

const CreateBlog: React.FC = () => {
  const { state } = useLocation(); // Access passed data from navigate
  const postData = state?.post; // Destructure post data (this will be undefined if no data is passed)
  const navigate = useNavigate(); // For redirecting after success

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postData) {
      // If post data is provided (i.e., from the Update button click)
      console.log("Post data received:", postData);
      setTitle(postData.title);
      setContent(postData.content);
      setThumbnail(postData.thumbnail);
    }
  }, [postData]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !thumbnail) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (postData) {
        // If it's an update, make a PUT request
        response = await fetch(`http://localhost:3000/api/posts/${postData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, thumbnail }),
        });
      } else {
        // If it's a new post, make a POST request
        response = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, thumbnail }),
        });
      }

      if (response.ok) {
        alert(postData ? "Post updated successfully!" : "Post submitted successfully!");
        setTitle("");
        setContent("");
        setThumbnail(null);
        navigate("/dashboard"); // Navigate to posts list after success
      } else {
        throw new Error("Failed to save the post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 mx-16">
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-2xl text-purple-800">{postData ? "Update Your Blog" : "Write Your Thoughts..."}</h2>
        <button
          className={`py-2 px-3 rounded-md text-white ${!title.trim() || !content.trim() || !thumbnail ? "bg-gray-300 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"}`}
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim() || !thumbnail || loading}
        >
          {loading ? "Submitting..." : postData ? "Update Blog" : "Submit Blog"}
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-300 hover:border-purple-500 duration-300 p-2 w-full my-2 rounded-md"
        />
        <ThumbnailUpload
          onUploadComplete={setThumbnail}
          currentThumbnail={postData?.thumbnail} // Passing the existing thumbnail URL if updating
          onRemoveComplete={(imageUrl) => setThumbnail(imageUrl)} // Handling removal by updating the state
        />
        <TinyEditor value={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default CreateBlog;
