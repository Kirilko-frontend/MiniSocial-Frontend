import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 shadow-lg flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold hover:opacity-90 transition">
        My MiniSocial App
      </Link>

      <div className="flex items-center space-x-6">
        <Link
          to="/posts"
          className="hover:text-gray-200 transition-all duration-200"
        >
          Posts
        </Link>
        <Link
          to="/users"
          className="hover:text-gray-200 transition-all duration-200"
        >
          Users
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:text-gray-200 transition-all duration-200 font-medium"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
                  {user.username?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <span>{user.username}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/auth/login"
              className="bg-white text-purple-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 transition-all duration-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
