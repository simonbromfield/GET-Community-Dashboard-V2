import React from 'react';
import moment from 'moment';
import { Box, Typography } from '@mui/material';

const FuelStats = ({ events }) => {
  const filteredEvents7Days = events.filter((event) => {
    const startDate = moment.unix(event.startTime);
    const now = moment();
    return startDate.isBetween(now.clone().subtract(7, 'days'), now) && !startDate.isAfter(now);
  });

  const filteredEvents30Days = events.filter((event) => {
    const startDate = moment.unix(event.startTime);
    const now = moment();
    return startDate.isBetween(now.clone().subtract(30, 'days'), now) && !startDate.isAfter(now);
  });

  const filteredEvents365Days = events.filter((event) => {
    const startDate = moment.unix(event.startTime);
    const now = moment();
    return startDate.isBetween(now.clone().subtract(365, 'days'), now) && !startDate.isAfter(now);
  });

  const calculateReservedFuel = (events) => {
    return events.reduce((total, event) => {
      return total + parseFloat(event.reservedFuel);
    }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const reservedFuel7Days = calculateReservedFuel(filteredEvents7Days);
  const reservedFuel30Days = calculateReservedFuel(filteredEvents30Days);
  const reservedFuel365Days = calculateReservedFuel(filteredEvents365Days);

  const dateRange7Days = `${moment().subtract(7, 'days').format('MMM D, YYYY')} - ${moment().format('MMM D, YYYY')}`;
  const dateRange30Days = `${moment().subtract(30, 'days').format('MMM D, YYYY')} - ${moment().format('MMM D, YYYY')}`;
  const dateRange365Days = `${moment().subtract(365, 'days').format('MMM D, YYYY')} - ${moment().format('MMM D, YYYY')}`;

  return (
    <div>
    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', bgcolor: '#f3f3f3', p: 2 }}>
      <Box sx={{ textAlign: 'center', bgcolor: '#ff9800', color: 'white', borderRadius: 1, p: 2, flex: 1 }}>
        <Typography variant="h4">7 Days</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>{dateRange7Days}</Typography>
        <Typography variant="h5">{reservedFuel7Days} GET</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', bgcolor: '#4caf50', color: 'white', borderRadius: 1, p: 2, flex: 1, ml: 2, mr: 2 }}>
        <Typography variant="h4">30 Days</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>{dateRange30Days}</Typography>
        <Typography variant="h5">{reservedFuel30Days} GET</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', bgcolor: '#3f51b5', color: 'white', borderRadius: 1, p: 2, flex: 1 }}>
        <Typography variant="h4">365 Days</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>{dateRange365Days}</Typography>
        <Typography variant="h5">{reservedFuel365Days} GET</Typography>
      </Box>
      </Box>
    </div>
  );
};

export default FuelStats;
