import React from "react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    thumbnail: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-lg p-4 shadow-md cursor-pointer"
      onClick={() => navigate(`/blog/${post._id}`)} // ✅ Navigate to the new page
    >
      <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
      <p className="text-blue-500">Read More</p>
    </div>
  );
};

export default BlogCard;
