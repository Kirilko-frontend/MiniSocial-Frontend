import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { UserProvider, UserContext } from "./context/UserContext";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PostsPage from "./pages/PostsPage";
import UsersPage from "./pages/UsersPage";
import UserPostsPage from "./pages/UserPostsPage";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Spinner />;
  return user ? children : <Navigate to="/auth/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname.startsWith("/auth/login") ||
    location.pathname.startsWith("/auth/register");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id/posts"
          element={
            <PrivateRoute>
              <UserPostsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
