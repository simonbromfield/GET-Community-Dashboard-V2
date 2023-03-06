import React from 'react';
import Chip from '@mui/material/Chip';

function BuySell(props) {
  const { amount0In } = props;

  const buyStyle = {
    backgroundColor: '#2C8C15',
    color: 'white',
  };
  const sellStyle = {
    backgroundColor: '#C8202D',
    color: 'white',
  };

  return (
    <>
      {(() => {
        switch (amount0In) {
          case '0':
            return <Chip sx={buyStyle} label="BUY" />;
          default:
            return <Chip sx={sellStyle} label="SELL" />;
        }
      })()}
    </>
  );
}

export default BuySell;
