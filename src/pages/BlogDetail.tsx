import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../components/CommentSection"; // Import the new component

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

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <button className="bg-gray-500 text-white px-4 py-2 mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <img src={post.thumbnail} alt={post.title} className="w-full h-60 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
      <p className="text-gray-500">{new Date(post.dateCreated).toLocaleDateString()}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Comments Section */}
      <CommentSection postId={id ?? ""} comments={post.comments || []} onCommentAdded={handleCommentAdded} />
      </div>
  );
};

export default BlogDetail;
