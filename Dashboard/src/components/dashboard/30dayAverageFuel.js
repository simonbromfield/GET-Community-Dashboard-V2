import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import { numberWithCommas } from '../../utils/helpers';

const API_URL =
  'https://gateway.thegraph.com/api/5cb3bc7942a919148db4e6a356a02b43/subgraphs/id/5S9b6URgphe9h19c5rQwAWd9aed1i1m1mHiqPKM1Fvvq';

const AverageReservedFuel = () => {
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(API_URL, {
          query: `
            {
              protocolDays(orderBy: day, orderDirection: desc, first: 30, skip: 1) {
                reservedFuel
              }
            }
          `,
        });

        const totalReservedFuel = res.data.data.protocolDays.reduce(
          (sum, day) => sum + Number(day.reservedFuel),
          0
        );

        setAverage(totalReservedFuel / res.data.data.protocolDays.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            DAILY FUEL AVERAGE (30 days)
          </Typography>
          <Typography color="textPrimary"
variant="h5">
            {numberWithCommas(Number(average).toFixed(2)) + ' GET'}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default AverageReservedFuel;
