import React from 'react';
import Chip from '@mui/material/Chip';

function ReSoldChip(props) {
  const { reSoldCount } = props;

  const resoldStyle = {
    backgroundColor: '#E857BB',
    color: 'white',
  };

  return <Chip sx={resoldStyle} label={reSoldCount} />;
}

export default ReSoldChip;
