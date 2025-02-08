import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  dateCreated: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Failed to load post:", err));
  }, [id]);

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
    </div>
  );
};

export default BlogDetail;
