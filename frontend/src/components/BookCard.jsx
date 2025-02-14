import { Link } from "react-router-dom";
import { BookOpen, Calendar } from 'lucide-react';

export default function BookCard({book}) {
  const {_id, title, author, description, publishedYear, coverImage} = book;
    
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <Link to={`/books/${_id}`} className="block h-full">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={coverImage || '/api/placeholder/200/300'}
            alt={title}
            className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"/>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1">
              {title}
            </h2>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-4 h-4 mr-1" />
            <p className="text-sm">{author}</p>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{publishedYear}</span>
          </div>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}