import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';

import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()

const TokenDataApp = () => {
  const [tokenPriceUSD, setTokenPriceUSD] = useState(null)
  const [tokenPriceEUR, setTokenPriceEUR] = useState(null)
  
  const [loading, setLoading] = useState(false)

  const tokenDataFunction = async () => {
    try {
      const coinData = await CoinGeckoClient.coins.fetch('get-token', {})
      console.log(coinData.data)
      setTokenPriceUSD(coinData.data.market_data.current_price.usd)
      setTokenPriceEUR(coinData.data.market_data.current_price.eur)
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    tokenDataFunction()
  }, [])

  const displayTokenPrice = () => {
    return (
      <>
       <Typography color="textPrimary"
variant="h4" >
        ${ tokenPriceUSD }
      </Typography>
      <Typography color="textPrimary"
variant="p" >
         €{ tokenPriceEUR }
      </Typography>
      </>    
    )
  }

  return <div>
    <Card
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="overline"
              >
                Token Price
              </Typography>
    { loading ? displayTokenPrice() :
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="inherit" />
      </Box>
    }
    </Grid>
    </Grid>
  </CardContent>
</Card>
  </div>
}

export default TokenDataApp
