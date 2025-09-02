import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">Loading user...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Profile
      </h1>

      <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg transition hover:shadow-2xl">
        {user.image ? (
          <img
            src={user.image}
            alt="User Avatar"
            className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-500 shadow-sm"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-inner">
            {user.username?.[0]?.toUpperCase() || "?"}
          </div>
        )}

        <div className="text-center space-y-2">
          <p className="font-semibold text-xl text-gray-800">{user.username}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
