import React from 'react';
import Chip from '@mui/material/Chip';
import { RoundedCorner } from '@mui/icons-material';

function ClaimedChip(props) {
  const { claimedCount } = props;

  const claimedStyle = {
    backgroundColor: '#6EB7E4',
    color: 'white',
  };

  return <Chip sx={claimedStyle} label={claimedCount} />;
}

export default ClaimedChip;
