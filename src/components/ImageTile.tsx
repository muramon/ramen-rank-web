import React from 'react';
import Grid from '@mui/material/Grid';
import Image from '../images/ramen1.jpg'; // 画像のパスを適切に指定する
import { createTheme, ThemeProvider } from '@mui/material/styles';


const ImageTile: React.FC = () => {
  const images = [
    // 画像のリストをここに追加
    // 例: '/images/image1.jpg', '/images/image2.jpg', ...
    Image, Image,Image, Image,Image, Image,Image, Image,Image, Image,
  ];

  return (
      <Grid container  spacing={{ xs: 3, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>
        {images.map((image, index) => (
          <Grid item key={index} xs={12} sm={4} md={4} lg={3}>
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
        ))}
      </Grid>
  );
};

export default ImageTile;
