import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
import { numberWithCommas } from '../../utils/helpers';

import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

const MarketCapApp = () => {
  const [marketCapUSD, setMarketCapUSD] = useState(null);
  const [marketCapEUR, setMarketCapEUR] = useState(null);

  const [loading, setLoading] = useState(false);

  const tokenDataFunction = async () => {
    try {
      const coinData = await CoinGeckoClient.coins.fetch('get-token', {});
      setMarketCapUSD(
        numberWithCommas(coinData.data.market_data.market_cap.usd)
      );
      setMarketCapEUR(
        numberWithCommas(coinData.data.market_data.market_cap.eur)
      );
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    tokenDataFunction();
  }, []);

  const displayMarketCap = () => {
    return (
      <>
        <Typography color="textPrimary"
variant="h5">
          ${marketCapUSD}
        </Typography>
        <Typography color="textPrimary"
variant="p">
          €{marketCapEUR}
        </Typography>
      </>
    );
  };

  return (
    <div>
      <Typography
        color="textSecondary"
        sx={{
          marginTop: 3,
        }}
      >
        MARKET CAP
      </Typography>
      {loading ? (
        displayMarketCap()
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </div>
  );
};

export default MarketCapApp;
