import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  MessageSquare,SquarePen
} from "lucide-react";
import ReviewModal from "../components/ReviewModel";
import { fetchOneBook, fetchBookReviews } from "../utils/api";
import ReviewCard from "../components/ReviewCard";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchOneBook(id);
        setBook(data.book);

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

  const handleReviewSubmitted = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">Error: {error}</p>
              <Link to="/books" className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen bg-[url('/api/placeholder/20/20')] bg-repeat bg-amber-50/90">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/books" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6 font-serif">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
          <div className="md:flex gap-12 items-start">
            <div className="md:w-1/3">
              <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-xl shadow-md">
                <img
                  src={book.coverImage || "/api/placeholder/400/600"}
                  alt={book.title}
                  className="w-full h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105"
                />
              </div>
            </div>

            <div className="md:w-2/3 mt-8 md:mt-0">
              <div className="font-serif uppercase tracking-wide text-sm text-amber-600 font-semibold">
                ISBN: {book.isbn}
              </div>
              <h1 className="mt-2 text-4xl font-serif font-bold text-gray-900">{book.title}</h1>
              <p className="mt-2 text-xl text-gray-600 italic">by {book.author}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900">About the Book</h2>
                  <p className="mt-3 text-gray-600 leading-relaxed">{book.description}</p>
                </div>

                <div className="border-t border-amber-100 pt-6">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">Details</h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <span className="text-gray-600">Published Year</span>
                      <p className="text-lg font-semibold text-gray-900">{book.publishedYear}</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <span className="text-gray-600">Added</span>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6">
                  <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md">
                    Add to Reading List
                  </button>
                  <button className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
                    Share
                  </button>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md flex items-center gap-2"
                  >
                    <SquarePen size={20} />
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-amber-100 pt-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Reader Reviews
                <span className="ml-2 text-lg font-normal text-gray-500">({reviews.length})</span>
              </h2>
            </div>

            <div className="space-y-6">
              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="transform transition-all hover:-translate-y-1">
                    <ReviewCard review={review} />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-amber-50 rounded-xl border border-amber-100">
                  <MessageSquare className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-serif text-lg">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        bookId={id}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
