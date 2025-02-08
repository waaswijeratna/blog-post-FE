import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  dateCreated: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts?search=${encodeURIComponent(
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
    <div style={{ padding: "20px" }}>
      <h2 className="text-2xl font-bold text-center mb-4">Latest Blogs</h2>
      <div className="flex justify-center mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post._id} post={post} />)
        ) : (
          <p className="text-center col-span-full">No posts found.</p>
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

export default HomePage;
