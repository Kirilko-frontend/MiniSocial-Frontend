import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data.data);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToUserPosts = (id) => {
    navigate(`/users/${id}/posts`);
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading users...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">All Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => goToUserPosts(user._id)}
              className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-blue-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-3 text-xl font-bold border-2 border-gray-200">
                  {user.username?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <p className="font-semibold text-lg">{user.username}</p>
              <p className="text-gray-500 text-sm break-all">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
