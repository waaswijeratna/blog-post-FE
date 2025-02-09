import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

interface Comment {
  name: string;
  comment: string;
  date: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: (newComment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onCommentAdded }) => {
  const [commentName, setCommentName] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const commentsPerPage = 5;
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const sortedComments = [...comments].reverse();
  const paginatedComments = sortedComments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      alert("Please fill out both your name and comment.");
      return;
    }

    setLoadingComment(true);
    const newComment: Comment = {
      name: commentName.trim(),
      comment: commentText.trim(),
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        onCommentAdded(newComment);
        setCommentName("");
        setCommentText("");
        setCurrentPage(1);
      } else {
        throw new Error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <div className="mt-8 bg-purple-50 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4">Comments</h2>

      {comments.length > 0 ? (
        <div>
          {paginatedComments.map((c, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 p-4 bg-white border border-purple-200 rounded-lg shadow-sm"
            >
              <p className="font-bold text-purple-700">
                {c.name} <span className="text-sm text-gray-500">({new Date(c.date).toLocaleString()})</span>
              </p>
              <p className="text-gray-700 mt-1">{c.comment}</p>
            </motion.div>
          ))}

          <Stack spacing={2} className="mt-4 flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              variant="outlined"
              shape="rounded"
              color="secondary"
            />
          </Stack>
        </div>
      ) : (
        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
      )}

      <form onSubmit={handleCommentSubmit} className="mt-6 bg-white p-4 rounded-xl shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Your comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
        </div>
        <motion.button 
          type="submit" 
          disabled={loadingComment} 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition disabled:bg-purple-300"
        >
          {loadingComment ? "Posting..." : "Post Comment"}
        </motion.button>
      </form>
    </div>
  );
};

export default CommentSection;
