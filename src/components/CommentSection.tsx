import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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

  // Reverse comments to show the latest first
  const sortedComments = [...comments].reverse();

  // Get the comments for the current page
  const paginatedComments = sortedComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        onCommentAdded(newComment);
        setCommentName("");
        setCommentText("");
        setCurrentPage(1); // Reset to first page after new comment
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
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {comments.length > 0 ? (
        <div>
          {paginatedComments.map((c, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <p className="font-bold">
                {c.name} <span className="text-sm text-gray-500">({new Date(c.date).toLocaleString()})</span>
              </p>
              <p>{c.comment}</p>
            </div>
          ))}

          {/* Material-UI Pagination */}
          <Stack spacing={2} className="mt-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mt-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Your comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <button type="submit" disabled={loadingComment} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loadingComment ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
