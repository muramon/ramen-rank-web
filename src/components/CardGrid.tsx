// src/components/CardGrid.tsx
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CardItem from './CardItem';
import Image from '../images/ramen1.jpg'; // 画像のパスを適切に指定する
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
    const [data, setData] = useState([{"name": "a", "score": "3", "img": Image}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8001/", { method: "GET"})
            //   .then(res => res.json()
              .then(res => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
              }
              ).then(data => {
                console.log(loading)
                setLoading(false);
                console.log(loading)
                setData(data);
              },
              (error) => {
                // setLoading([true]);
                setError(error);
                console.log(error)
              }
            )
        } ,[]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8001/'); // APIのエンドポイントに置き換える
    //         const result = await response.json();
    //         setData(result);
    //     } finally {
    //         setLoading([false]);
    //     }
    //     };

    //     fetchData();
    // }, []); // 空の依存配列を渡すことで、コンポーネントのマウント時にのみ実行される

    if (loading) {
        return <p>Loading...</p>;
    }

    // if (error) {
    //     return <p>Error</p>;
    // }

  return (
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <CardActionArea onClick={() => navigate("detail", { state: {title: item.name,
                                                                      content: item.score,
                                                                      img: item.img} })}>
          <CardItem title={item.name} content={item.score} img={item.img}/>
          </ CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
