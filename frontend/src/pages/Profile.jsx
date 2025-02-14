import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { Loader2, BookOpen, Mail, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import UpdateProfileModal from "../components/UpdateProfileModel";
import AddBookModal from "../components/AddBookModel";
import { fetchProfile } from "../utils/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const isUserAdmin = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;
      const decoded = jwtDecode(token);
      return decoded.role === "admin";
    } catch (error) {
      return false;
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    setProfile(updatedUser);
  };

  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const decoded = jwtDecode(token);
      return decoded.userId || decoded._id;
    } catch (error) {
      console.err("Error getting userId:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = getUserIdFromToken();

        if (!userId) {
          throw new Error("Authentication information not found");
        }

        const userData = await fetchProfile(userId);
        setProfile(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-serif font-bold text-center text-gray-900 mb-4">
            Welcome to Your Reading Journey
          </h2>
          <p className="text-gray-600 text-center font-serif">
            Please sign in to access your personal reading profile and reviews.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full">
          <p className="text-red-600 text-center font-serif">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-amber-400 to-amber-600" />
          <div className="relative px-8 pb-8">
            <div className="absolute -top-20 left-8">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-5xl font-serif text-amber-600">
                  {profile?.name?.charAt(0) ||
                    profile?.username?.charAt(0) ||
                    "?"}
                </span>
              </div>
            </div>
            <div className="pt-24">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-serif font-bold text-gray-900">
                  {profile?.name || profile?.username}
                </h1>
                <div className="space-x-4">
                  {isUserAdmin() && (
                    <button
                      onClick={() => setIsAddBookModalOpen(true)}
                      className="px-6 py-3 cursor-pointer text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-md"
                    >
                      Add New Book
                    </button>
                  )}
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="px-6 py-3 cursor-pointer text-amber-600 border-2 border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-amber-50 rounded-xl p-6 flex items-center space-x-4">
                  <User className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium text-gray-900">
                      {profile?.username}
                    </p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-6 flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {profile?.email}
                    </p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-6 flex items-center space-x-4">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Reviews</p>
                    <p className="font-medium text-gray-900">
                      {profile?.reviews?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        currentUser={profile}
        onProfileUpdate={handleProfileUpdate}
      />

      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
