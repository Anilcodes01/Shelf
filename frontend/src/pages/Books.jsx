import React, { useEffect, useState, useMemo } from "react";
import { useBookContext } from "../contexts/BookContext";
import { fetchBooks } from "../utils/api";
import BookCard from "../components/BookCard";
import { Loader2, BookOpen } from "lucide-react";
import SearchBar from "../components/SearchBar";
import FilterTags from "../components/FilterTags";

export function Books() {
  const { books, setBooks, loading, setLoading, error, setError } = useBookContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = useMemo(() => {
    if (!books || !Array.isArray(books)) return [];
    const uniqueGenres = new Set(
      books.flatMap(book => book.genres || []).filter(Boolean)
    );
    return Array.from(uniqueGenres).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (!books || !Array.isArray(books)) return [];
    
    return books.filter(book => {
      const matchesSearch = !searchTerm.trim() || 
        (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(book.genres) && book.genres.some(genre => 
          genre?.toLowerCase().includes(searchTerm.toLowerCase())
        )));

      const matchesGenre = !selectedGenre || 
        (Array.isArray(book.genres) && book.genres.includes(selectedGenre));

      return matchesSearch && matchesGenre;
    });
  }, [books, searchTerm, selectedGenre]);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchBooks();
        setBooks(Array.isArray(data.books) ? data.books : []);
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
      <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90">
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Library Collection
            </h1>
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90">
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Library Collection
            </h1>
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <header className="mb-8 border-b border-amber-200 pb-6">
            <h1 className="text-4xl font-serif font-bold text-gray-900">
              Library Collection
            </h1>
            <p className="mt-2 text-gray-600 italic">
              Discover your next literary adventure
            </p>
          </header>

          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />

          <FilterTags
            selectedGenre={selectedGenre}
            genres={genres}
            onGenreSelect={setSelectedGenre}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book._id || book.id}>
                  <BookCard book={book} />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
                <BookOpen className="w-16 h-16 text-amber-400 mb-4" />
                <p className="text-gray-500 text-lg text-center font-serif">
                  {searchTerm || selectedGenre ? (
                    <>
                      No books found matching your search.
                      <br />
                      Try adjusting your filters.
                    </>
                  ) : (
                    <>
                      Our shelves are currently empty.
                      <br />
                      Check back soon for new arrivals.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;