// src/components/CardGrid.tsx
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CardItem from './CardItem';
import Image from '../images/ramen1.jpg'; // 画像のパスを適切に指定する
import { Container } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// const data = [
//   { title: 'Card 1', content: 'Content for Card 1', img: Image },
//   { title: 'Card 2', content: 'Content for Card 2', img: Image },
//   { title: 'Card 3', content: 'Content for Card 3', img: Image },
//   { title: 'Card 3', content: 'Content for Card 3', img: Image },
//   { title: 'Card 3', content: 'Content for Card 3', img: Image },
//   { title: 'Card 3', content: 'Content for Card 3', img: Image },
//   { title: 'Card 3', content: 'Content for Card 3', img: Image },
//   { title: 'Card 3', content: 'Content for Card 3', img: Image },
//   // Add more card data as needed
// ];

const CardGrid: React.FC = () => {
    const [data, setData] = useState([{"id": "0", "name": "a", "score": "3", "img": Image}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const headers = new Headers({
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${token}`
    })

    useEffect(() => {
        fetch("https://men-saku.com/", { method: "GET",headers: headers})
              .then(res => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
              }
              ).then(data => {
                // console.log(data)
                setLoading(false);
                // console.log(loading)
                setData(data);
              },
              (error) => {
                setLoading(true);
                setError(error);
                // console.log(error)
              }
            )
        } ,[]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error</p>;
    }

  return (
    <Container component="main" maxWidth="lg">
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <CardActionArea onClick={() => navigate(`/detail/${item.id}`, { state: {id: item.id,
                                                                      title: item.name,
                                                                      content: item.score,
                                                                      img: item.img} })}>
          <CardItem title={item.name} content={item.score} img={item.img}/>
          </ CardActionArea>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default CardGrid;
