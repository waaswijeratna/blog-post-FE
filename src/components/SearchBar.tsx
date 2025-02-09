import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center bg-purple-500 p-1 rounded-full ">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 pl-5 bg-white text-gray-800 rounded-full outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        />
        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-purple-500 text-white p-2 rounded-full flex items-center justify-center ml-2  transition-all"
        >
          <FaSearch className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
