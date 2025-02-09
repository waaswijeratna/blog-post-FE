import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CommentSection from "../components/CommentSection";

interface Comment {
  name: string;
  comment: string;
  date: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  dateCreated: string;
  comments?: Comment[];
  authorName: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data: Post) => setPost(data))
      .catch((err) => console.error("Failed to load post:", err));
  }, [id]);

  const handleCommentAdded = (newComment: Comment) => {
    setPost((prev) =>
      prev ? { ...prev, comments: prev.comments ? [...prev.comments, newComment] : [newComment] } : prev
    );
  };

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-6 p-6 max-w-4xl mx-auto bg-white shadow-md shadow-purple-400 rounded-lg"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-500 text-white px-4 py-2 mb-6 rounded hover:bg-purple-700 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-6"
      >
        <motion.img
          src={post.thumbnail}
          alt={post.title}
          className="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-purple-800">{post.title}</h1>
          <p className="text-purple-600 mt-2">By <span className="font-semibold">{post.authorName}</span></p>
          <p className="text-gray-400 text-sm">{new Date(post.dateCreated).toLocaleDateString()}</p>
        </motion.div>
      </motion.div>

      <hr className="my-6 border-t-2 border-purple-300" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="prose max-w-none text-gray-800"
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </motion.div>

      <hr className="my-6 border-t-2 border-purple-300" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <CommentSection postId={id ?? ""} comments={post.comments || []} onCommentAdded={handleCommentAdded} />
      </motion.div>
    </motion.div>
  );
};

export default BlogDetail;