import React from 'react';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Pie } from 'react-chartjs-2';
import { Box, Container, CardHeader } from '@mui/material';

const FuelChart = (props) => {
  let { data, title } = props;
  const [chartData, setChartData] = useState({
    labels: ['Reserved', 'Spent', 'Available'],
    datasets: [
      {
        label: 'Fuel',
        data: [
          Number(data.reservedFuel).toFixed(2),
          Number(data.spentFuel).toFixed(2),
          Number(data.availableFuel).toFixed(2),
        ],
        backgroundColor: ['#543BD1', '#15083F', '#77B094'],
        hoverOffset: 3,
      },
    ],
  });

  const displayGraph = () => {
    return (
      <>
        <CardHeader title={title} />
        <Container>
          <Pie data={chartData} />
        </Container>
      </>
    );
  };

  return (
    <div>
      {chartData ? (
        displayGraph()
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </div>
  );
};

export default FuelChart;
