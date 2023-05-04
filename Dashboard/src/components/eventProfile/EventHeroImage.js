import React from 'react';
import { Box, Typography } from '@mui/material';

export const EventHeroImage = ({ imageUrl, name }) => {
  const imageSrc = imageUrl || '/placeholder.png';
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
      <Box
        component="img"
        src={imageSrc}
        alt={name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '13px'
        }}
      />
    </Box>
  );
};
