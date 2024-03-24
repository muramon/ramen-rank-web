// src/App.tsx
import React from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import SearchBar from './components/SearchBar';
import Appbar from './components/Appbar';
import RamenDiningIcon from '@mui/icons-material/RamenDining';


const App: React.FC = () => {
  const handleSearch = (query: string) => {
    // ここで検索ロジックを追加するか、サーバーに検索クエリを送信します
    // console.log(`Searching for: ${query}`);
  };
  
  return (
    <>
    <Appbar/>
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          >
        <RamenDiningIcon sx={{ mr: 2 }} fontSize="large"/>
          MENSAKU
        </Typography>
        <Typography
          component="h3"
          variant="h6"
          align="center"
          color="text.primary"
          gutterBottom
          >
          明日食べたいラーメンが見つかる麺索
        </Typography>
        <SearchBar onSearch={handleSearch} />
        {/* ここに検索結果や他の UI 要素を追加 */}
        {/* <ImageGrid /> */}
        {/* <CardGrid /> */}
      </div>
    </Container>
    </>
  );
};

export default App;
