import React from 'react';
import Chip from '@mui/material/Chip';

function GETVolume(props) {
  const { amount0In, amount0Out } = props;
  const buyStyle = {
    backgroundColor: '#FFFFFF',
    color: '#2C8C15',
  };
  const sellStyle = {
    backgroundColor: '#FFFFFF',
    color: '#C8202D',
  };
  return (
    <>
      {(() => {
        switch (amount0In) {
          case '0':
            return <Chip sx={buyStyle} label={Number(amount0Out).toFixed(3)} />;
          default:
            return (
              <>
                <Chip
                  sx={sellStyle}
                  label={`${Number(amount0In).toFixed(3)} →`}
                />
              </>
            );
        }
      })()}
    </>
  );
}

export default GETVolume;
