import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { updateUserProfile } from "../utils/api"; 

const UpdateProfileModal = ({ isOpen, onClose, currentUser, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    username: currentUser?.username || "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const updateData = {};
      if (formData.name !== currentUser.name) updateData.name = formData.name;
      if (formData.email !== currentUser.email) updateData.email = formData.email;
      if (formData.username !== currentUser.username) updateData.username = formData.username;
      if (formData.password) updateData.password = formData.password;

      if (Object.keys(updateData).length === 0) {
        onClose();
        return;
      }

      const updatedUser = await updateUserProfile(currentUser._id, updateData); 
      onProfileUpdate(updatedUser.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-semibold text-gray-900">Edit Your Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-amber-50 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-serif font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-serif font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-serif font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
              placeholder="Choose a username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-serif font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
              placeholder="Leave blank to keep current password"
            />
            <p className="text-sm text-gray-500 italic">
              Leave blank if you don't want to change your password
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-amber-600 bg-white border-2 border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Updating...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;