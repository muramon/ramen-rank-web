// src/components/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import CardItem from './CardItem';
import Image from '../images/ramen1.jpg'; // 画像のパスを適切に指定する
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([{"id": "0", "name": "a", "score": "3", "img": Image}]);
  const navigate = useNavigate();
  const headers = new Headers({
    'Content-Type': 'application/json'
    // 'Authorization': `Bearer ${token}`
  })

  useEffect(() => {
    fetch("http://35.238.124.207/", { method: "GET",
                                      headers: headers})
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          }
          ).then(data => {
            console.log(data)
            setLoading(false);
            console.log(loading)
            setResult(data);
          },
          (error) => {
            setLoading(true);
            setError(error);
            console.log(error)
          }
        )
    } ,[]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error</p>;
    }

  const handleSearch = () => {
    fetch(`http://35.238.124.207/search?query=${query}`, { method: "GET",
                                                           headers: headers})
                .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
                }
                ).then(data => {
                console.log(data)
                setResult(data);
                console.log(result)
                },
                (error) => {
                // setLoading(true);
                // setError(error);
                console.log(error)
                }
            )
        };

  return (
    <>
    <Container component="main" maxWidth="lg">
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <TextField fullWidth 
            id="outlined-basic" 
            label="例: 二郎系 上品" 
            variant="standard" 
            size="small" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
              event.preventDefault();
              console.log("enterを押しました")
              handleSearch();
            }}}
          />
          {/* <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: 10 }}>
            Search
          </Button> */}
          <IconButton type="button" 
                      sx={{ p: '10px' }} 
                      aria-label="search" 
                      onClick={handleSearch}
                      >
            <SearchIcon />
          </IconButton>
          </Paper>
        </Stack>
      <div style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
      {result.map((item, index) => (
      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
        <CardActionArea onClick={() => navigate(`/detail/${item.id}`, { state: {id: item.id,
                                                                    title: item.name,
                                                                    content: item.score,
                                                                    img: item.img}})}>
        <CardItem title={item.name} content={item.score} img={item.img}/>
        </ CardActionArea>
        </Grid>
      ))}
      </Grid>
      </div>
    </Container>
    </>
  );
};

export default SearchBar;
