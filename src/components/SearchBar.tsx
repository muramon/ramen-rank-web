// src/components/SearchBar.tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: 10 }}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
