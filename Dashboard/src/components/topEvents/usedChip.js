import React from 'react';
import Chip from '@mui/material/Chip';

function UsedChip(props) {
  const { usedCount } = props;

  const usedStyle = {
    backgroundColor: '#D8322E',
    color: 'white',
  };

  return <Chip sx={usedStyle}
label={usedCount} />;
}

export default UsedChip;
