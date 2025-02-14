import React from 'react';

const FilterTags = ({ selectedGenre, genres = [], onGenreSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        key="all"
        onClick={() => onGenreSelect(null)}
        className={`px-4 py-2 rounded-full text-sm ${
          !selectedGenre
            ? 'bg-amber-500 text-white'
            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
        } transition-colors`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreSelect(genre)}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedGenre === genre
              ? 'bg-amber-500 text-white'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          } transition-colors`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;