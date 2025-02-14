import { Star, StarHalf, User } from 'lucide-react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <Star key={`full-${index}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - Math.ceil(rating))].map((_, index) => (
        <Star key={`empty-${index}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-gray-600">{rating}</span>
    </div>
  );
};

export default function ReviewCard({ review }) {
  const { rating, comment, createdAt, userId } = review;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{userId.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        <StarRating rating={rating} />
      </div>
      <p className="mt-4 text-gray-700 leading-relaxed">{comment}</p>
    </div>
  );
}