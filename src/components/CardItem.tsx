// src/components/CardItem.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

interface CardItemProps {
  title: string;
  content: string;
  img: string;
}

const CardItem: React.FC<CardItemProps> = ({ title, content, img }) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;
