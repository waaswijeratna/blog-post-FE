import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the magnifying glass icon

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Trigger the search callback with the current search term.
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  // Also trigger search on Enter key press.
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-md">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full p-2 outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 flex items-center justify-center"
      >
        <FaSearch className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
