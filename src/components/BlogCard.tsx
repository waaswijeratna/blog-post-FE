import React from "react";
import { useNavigate } from "react-router-dom";

interface Comment {
  name: string;
  comment: string;
  date: string;
}

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    thumbnail: string;
    dateCreated: string;
    authorName: string;
    comments?: Comment[];
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" relative w-[80vw] sm:w-[40vw] lg:w-[30vw] h-80 cursor-pointer rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md hover:shadow-purple-400 group"
      onClick={() => navigate(`/blog/${post._id}`)}
    >
      <div className="relative h-4/5 w-full">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-purple-700 bg-opacity-50 backdrop-blur-sm text-white flex justify-between p-2 items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-xs sm:text-sm">By {post.authorName} • {new Date(post.dateCreated).toLocaleDateString()}</span>
          <span className="text-xs sm:text-sm">{post.comments?.length ?? 0} {post.comments?.length === 1 ? "comment" : "comments"}</span>
        </div>
      </div>

      <div className="h-1/5 bg-white p-3 flex items-center">
        <h3 className="text-sm sm:text-md font-semibold text-purple-800">{post.title}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
