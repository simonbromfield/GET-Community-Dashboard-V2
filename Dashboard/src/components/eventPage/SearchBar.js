import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className={styles.searchBarContainer}>
    <input
      type="text"
      className={styles.searchInput}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Search events..."
    />
    <button className={styles.searchButton} onClick={() => onSearch(searchQuery)}>
      <SearchIcon />
    </button>
  </div>
  );  
};

export default SearchBar;
