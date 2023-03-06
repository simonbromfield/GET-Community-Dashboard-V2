import React from 'react';
import Chip from '@mui/material/Chip';

function CheckedInChip(props) {
  const { checkedInCount } = props;

  const checkedInStyle = {
    backgroundColor: '#325FEB',
    color: 'white',
  };

  return <Chip sx={checkedInStyle}
label={checkedInCount} />;
}

export default CheckedInChip;
