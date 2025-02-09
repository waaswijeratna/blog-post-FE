import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import SearchBar from "../../components/SearchBar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  dateCreated: string;
  authorName: string;
}

const ModeratorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { logout } = useAuth(); 
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData).id : null;
      try {
        const response = await fetch(
          `https://blog-post-bxf2hxd0ejgsazf0.eastasia-01.azurewebsites.net/api/posts?search=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${postsPerPage}&userId=${userId}`
        );
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(Math.ceil(data.total / postsPerPage));
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    fetchPosts();
  }, [searchQuery, currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleUpdateClick = (post: Post) => {
    navigate("/create-blog", { state: { post } });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDeleteClick = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`https://blog-post-bxf2hxd0ejgsazf0.eastasia-01.azurewebsites.net/api/posts/${postId}`, {
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
    <div className="p-6">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between mb-6 bg-white shadow-md shadow-purple-300 px-6 py-4 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/LOGO.png" alt="Logo" className="h-[6vh] md:h-[13vh] mb-4 md:mb-0" />
        <h2 className="text-2xl font-bold text-purple-600">Moderator Dashboard</h2>
        <SearchBar onSearch={handleSearch} />
        <button className="bg-purple-500 hover:bg-purple-700 duration-300 text-white px-4 py-2 rounded-md" onClick={() => navigate("/create-blog")}>+ Create Post</button>
        <button onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} size="lg" color="red"/></button>
      </motion.div>

      <div className="min-h-[70vh] bg-gray-100 p-4 rounded-lg shadow-lg shadow-purple-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post._id}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BlogCard post={post} />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button className="bg-purple-400 hover:bg-purple-600 duration-300 text-white px-3 py-2 rounded-md" onClick={() => handleUpdateClick(post)}>Update</button>
                  <button className="bg-red-500 hover:bg-red-700 duration-300 text-white px-3 py-2 rounded-md" onClick={() => handleDeleteClick(post._id)}>Delete</button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No posts found.</p>
          )}
        </div>
      </div>

      <Stack spacing={2} className="flex flex-row items-center  justify-center mt-6">
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
