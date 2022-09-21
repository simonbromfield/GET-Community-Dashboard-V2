import React from 'react'
import Chip from '@mui/material/Chip';

function SoldChip(props) {
  const { soldCount } = props;

  const soldStyle = {
    backgroundColor: '#59C399',
    color: 'white'
  };
  
  return (
    <Chip
      sx={soldStyle}
      label={soldCount}
    />
    )
}

export default SoldChip
