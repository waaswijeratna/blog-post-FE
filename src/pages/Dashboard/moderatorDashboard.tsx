import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  dateCreated: string;
}

const ModeratorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts?page=${currentPage}&limit=${postsPerPage}`
        );
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(Math.ceil(data.total / postsPerPage));
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleUpdateClick = (post: Post) => {
    navigate("/create-blog", { state: { post } });
  };

  const handleDeleteClick = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== postId));
          alert("Post deleted successfully!");
        } else {
          throw new Error("Failed to delete the post");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

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
          posts.map((post) => (
            <div key={post._id} className="relative">
              <BlogCard post={post} />
              <button
                className="absolute bottom-2 right-16 bg-blue-500 p-2 text-white"
                onClick={() => handleUpdateClick(post)}
              >
                Update
              </button>
              <button
                className="absolute bottom-2 right-2 bg-red-500 p-2 text-white"
                onClick={() => handleDeleteClick(post._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      {/* Material UI Pagination */}
      <Stack spacing={2} className="flex justify-center mt-6">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default ModeratorDashboard;
