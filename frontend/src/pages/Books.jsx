import { useEffect } from "react";
import { useBookContext } from "../context/BookContext";
import { fetchBooks } from "../utils/api";
import BookCard from "../components/BookCard";
import { Loader2, BookOpen } from 'lucide-react';

export function Books() {
  const { books, setBooks, loading, setLoading, error, setError } = useBookContext();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchBooks();
        setBooks(data.books);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadBooks();
  }, [setBooks, setLoading, setError]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Books</h1>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Books</h1>
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Books</h1>
          <p className="mt-2 text-gray-600">Discover your next favorite read</p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books && books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
              <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg text-center">
                No books found. Check back later for new additions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}