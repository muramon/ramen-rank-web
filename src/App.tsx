// src/App.tsx
import React from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageTile';
import { useState, useEffect } from 'react';
import CardGrid from './components/CardGrid';


const App: React.FC = () => {
  const handleSearch = (query: string) => {
    // ここで検索ロジックを追加するか、サーバーに検索クエリを送信します
    console.log(`Searching for: ${query}`);
  };
  const [items, setItems] = useState([{"rank":22,"itemName":"","catchcopy":"","mediumImageUrls":"","affiliateUrl":"","affiliateRate":"4.0","itemCaption":"","itemPrice":"","reviewAverage":""}])

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Search Site
        </Typography>
        <SearchBar onSearch={handleSearch} />
        {/* ここに検索結果や他の UI 要素を追加 */}
        {/* <ImageGrid /> */}
        <CardGrid />
      </div>
    </Container>
  );
};

export default App;
