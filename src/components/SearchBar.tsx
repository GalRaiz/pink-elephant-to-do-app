import React from "react";
import "./SearchBar.css";

interface ISearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
        className="search-bar"
      />
      <div className="search-icon">🔍</div>
    </div>
  );
};

export default SearchBar;
