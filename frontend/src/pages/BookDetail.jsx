import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, BookOpen, Loader2, MessageSquare } from "lucide-react";
import { fetchOneBook, fetchBookReviews } from "../utils/api";
import ReviewCard from "../components/ReviewCard";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchOneBook(id);
        setBook(data.book)
       
        setReviewsLoading(true);
        const reviewsData = await fetchBookReviews(id);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setReviewsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
        <div className="max-w-4xl mx-auto">
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
            <Link to="/books" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/books" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={book.coverImage || '/api/placeholder/400/600'}
                alt={book.title}
                className="h-48 w-full object-cover md:h-full md:w-48"
              />
            </div>

            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                ISBN: {book.isbn}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {book.title}
              </h1>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-700">
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-medium">{book.author}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Published: {book.publishedYear}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>Added: {new Date(book.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add to Reading List
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews
              <span className="ml-2 text-lg font-normal text-gray-500">
                ({reviews.length})
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {reviewsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}