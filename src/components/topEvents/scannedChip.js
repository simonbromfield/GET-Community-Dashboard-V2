import React from 'react'
import Chip from '@mui/material/Chip';

function ScannedChip(props) {

  const { scannedCount } = props;

  const scannedStyle = {
    backgroundColor: '#E8A845',
    color: 'white',
  };
  
  return (
    <Chip
      sx={scannedStyle}
      label={scannedCount}
    />
    )
}

export default ScannedChip
