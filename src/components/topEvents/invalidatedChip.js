import React from 'react'
import Chip from '@mui/material/Chip';

function InvalidatedChip(props) {
  const { invalidatedCount } = props;

  const invalidatedStyle = {
    backgroundColor: '#EC5F58',
    color: 'white'
  };
  
  return (
    <Chip
      sx={invalidatedStyle}
      label={invalidatedCount}
    />
    )
}

export default InvalidatedChip
