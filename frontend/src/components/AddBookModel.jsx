import React, { useState } from "react";
import { X } from "lucide-react";
import { addBook } from "../utils/api";

const AddBookModal = ({ isOpen, onClose }) => {
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    coverImage: "",
    author: "",
    isbn: "",
    publishedYear: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addBook(bookData);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif font-semibold text-gray-900">
            Add New Book
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-amber-50 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-lg font-serif font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={bookData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
            />
          </div>

          <div>
            <label className="block text-lg font-serif font-medium text-gray-700">
              Author *
            </label>
            <input
              type="text"
              name="author"
              required
              value={bookData.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
            />
          </div>

          <div>
            <label className="block text-lg font-serif font-medium text-gray-700">
              ISBN *
            </label>
            <input
              type="text"
              name="isbn"
              required
              value={bookData.isbn}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
            />
          </div>

          <div>
            <label className="block text-lg font-serif font-medium text-gray-700">
              Cover Image URL *
            </label>
            <input
              type="url"
              name="coverImage"
              required
              value={bookData.coverImage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
            />
          </div>

          <div>
            <label className="block text-lg font-serif font-medium text-gray-700">
              Published Year
            </label>
            <input
              type="number"
              name="publishedYear"
              value={bookData.publishedYear}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
            />
          </div>

          <div>
            <label className="block text-lg font-serif font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={bookData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-300 transition-colors bg-amber-50/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 w-full text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;