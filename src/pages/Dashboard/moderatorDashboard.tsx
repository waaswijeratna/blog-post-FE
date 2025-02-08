import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/BlogCard";

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  dateCreated: string;
}

const ModeratorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]); // ✅ Explicitly define the type

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts)) // Ensure `data.posts` is an array of `Post`
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Moderator Dashboard</h2>
      <button
        className="bg-green-500 p-4 text-white mt-4"
        onClick={() => navigate("/create-blog")}
      >
        Create Post
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post._id} post={post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default ModeratorDashboard;
