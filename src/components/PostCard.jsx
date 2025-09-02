import React, { useState } from "react";
import { FiTrash2, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const PostCard = ({ post, onDelete, onLike }) => {
  const [liked, setLiked] = useState(post.userLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  const handleLike = () => {
    const newLiked = !liked;
    const newCount = newLiked ? likesCount + 1 : likesCount - 1;
    setLiked(newLiked);
    setLikesCount(newCount);

    if (onLike) {
      onLike(post._id, newLiked);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
              {post.author?.username?.[0]?.toUpperCase() || "?"}
            </div>
          )}
          <p className="font-semibold">{post.author?.username}</p>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(post._id)}
            className="text-red-500 hover:text-red-700 transition-all duration-200"
          >
            <FiTrash2 size={20} />
          </button>
        )}
      </div>

      <p className="text-gray-700 text-sm line-clamp-3">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mt-2 w-full max-h-60 object-cover rounded-xl transition-transform duration-200 hover:scale-105"
        />
      )}

      <div className="flex items-center mt-2 space-x-2">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
          } transition-colors duration-200`}
        >
          {liked ? <FaHeart /> : <FiHeart />}
          <span className="text-sm">{likesCount}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
