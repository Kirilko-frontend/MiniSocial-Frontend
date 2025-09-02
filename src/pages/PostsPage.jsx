import React, { useEffect, useState } from "react";
import { getPosts, createPost, deletePost } from "../api/postApi";
import PostCard from "../components/PostCard";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setNewImage(e.target.files[0]);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append("content", newContent);
    if (newImage) formData.append("image", newImage);

    try {
      await createPost(formData);
      setNewContent("");
      setNewImage(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form
        onSubmit={handleCreatePost}
        className="bg-white p-6 rounded-2xl shadow-xl mb-6 space-y-4 transition hover:shadow-2xl"
      >
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="What's new with you?"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          required
        />

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
          {newImage ? (
            <img
              src={URL.createObjectURL(newImage)}
              alt="preview"
              className="w-32 h-32 object-cover rounded-xl mb-2"
            />
          ) : (
            <span className="text-gray-400">Click or drag to add an image</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Create Post"}
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
