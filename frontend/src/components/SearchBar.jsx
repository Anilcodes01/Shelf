import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, author, or genre..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none bg-white/90"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;