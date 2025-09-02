import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../api/postApi";

const UserPostsPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPosts();
  }, [id]);

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      const userPosts = res.data.data.filter((post) => post.author._id === id);
      setPosts(userPosts);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading posts...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">User's Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">This user has no posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-xl shadow flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-3 mb-2">
                {post.author?.image ? (
                  <img
                    src={post.author.image}
                    alt={post.author.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                    {post.author?.username?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <p className="font-semibold">{post.author?.username}</p>
              </div>

              <p className="text-gray-600">{post.content}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="w-full max-h-60 object-contain rounded-xl mt-2"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPostsPage;
