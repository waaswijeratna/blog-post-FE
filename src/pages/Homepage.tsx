import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  dateCreated: string;
  authorName: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://blog-post-bxf2hxd0ejgsazf0.eastasia-01.azurewebsites.net/api/posts?search=${encodeURIComponent(
            searchQuery
          )}&page=${currentPage}&limit=${postsPerPage}`
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

  return (
    <div>
      <motion.div
        className="px-6 sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between mb-8 bg-white bg-opacity-75 backdrop-blur-sm shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/LOGO.png" alt="Logo" className="h-[10vh] md:h-[20vh] mb-4 md:mb-0"/>
        <SearchBar onSearch={handleSearch}/>
      </motion.div>

      <motion.div
        className=" px-6 flex flex-row gap-6 items-center w-full justify-left mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Explore Our Latest Blogs</h2>
          <p className="text-gray-600">Stay updated with the latest trends, insights, and tips from our expert bloggers.</p>
        </div>
        <div className="w-1/3">
        <img
          src="https://img.freepik.com/premium-vector/latest-doodle-mini-illustration-creative-writer_67813-22223.jpg?w=740"
          alt="Blogger"
          className="w-full md:w-auto h-[50vh] pointer-events-none"
        />
        </div>
      </motion.div>

      <div className="min-h-[90vh] bg-[#f7f7f7] py-3 px-6">
      <motion.div
        className=" flex flex-row flex-wrap gap-3 justify-between items-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div key={post._id}>
              <BlogCard post={post} />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No posts found.</p>
        )}
      </motion.div>
      </div>

      <Stack spacing={2} className="flex flex-row items-center  justify-center my-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
          />
        </motion.div>
      </Stack>
    </div>
  );
};

export default HomePage;
