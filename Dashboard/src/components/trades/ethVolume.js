import React from 'react';
import Chip from '@mui/material/Chip';

function ETHVolume(props) {
  const { amount1In, amount1Out } = props;
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
        switch (amount1In) {
          case '0':
            return <Chip sx={buyStyle}
label={Number(amount1Out).toFixed(6)} />;
          default:
            return (
              <>
                <Chip
                  sx={sellStyle}
                  label={`← ${Number(amount1In).toFixed(6)}`}
                />
              </>
            );
        }
      })()}
    </>
  );
}

export default ETHVolume;
