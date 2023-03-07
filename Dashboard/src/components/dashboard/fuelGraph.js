import React from 'react';
import { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container, Slider, Typography } from '@mui/material';
import { protocolDayToDate } from '../../utils/helpers';

const FuelGraph = (props) => {
  let { protocolDays } = props;
  const [value, setValue] = useState(7);
  const [protocolDaysRange, setProtocolDaysRange] = useState(
    protocolDays.slice(0, value)
  );
  const [fuel, setFuel] = useState(
    protocolDaysRange.map((x) => x.reservedFuel)
  );
  const [days, setDays] = useState(
    protocolDaysRange.map((x) => {
      let dayString;
      dayString = protocolDayToDate(x.day);
      return dayString;
    })
  );

  useEffect(() => {
    setFuel(protocolDaysRange.map((x) => x.reservedFuel));
    setDays(
      protocolDaysRange.map((x) => {
        let dayString;
        dayString = protocolDayToDate(x.day);
        return dayString;
      })
    );
  }, [protocolDaysRange]);

  const [chartData, setChartData] = useState({
    labels: days,
    datasets: [
      {
        label: 'GET Reserved',
        data: fuel,
        fill: false,
        borderColor: '#1E193B',
        backgroundColor: '#1E193B',
        tension: 0.2,
      },
    ],
  });

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      setProtocolDaysRange(protocolDays.slice(0, newValue));
      setFuel(protocolDaysRange.map((x) => x.reservedFuel));
      setDays(
        protocolDaysRange.map((x) => {
          let dayString;
          dayString = protocolDayToDate(x.day);
          return dayString;
        })
      );
      setChartData({
        labels: days,
        datasets: [
          {
            label: 'GET Reserved',
            data: fuel,
            fill: false,
            borderColor: '#1E193B',
            backgroundColor: '#1E193B',
            tension: 0.2,
          },
        ],
      });
    }
  };

  function valueLabelFormat(value) {
    const today = protocolDayToDate(protocolDays[0].day);
    const until = protocolDayToDate(protocolDays[0].day - value + 1);
    return `${today} - ${until}`;
  }

  const displayGraph = () => {
    return (
      <>
        <Line data={chartData} />
      </>
    );
  };

  return (
    <div>
      <Container>
        <Box sx={{ width: 1 }}>
          <Typography id="non-linear-slider"
sx={{ pt: 3 }}>
            Range: {valueLabelFormat(value)}
          </Typography>
          <Slider
            value={value}
            min={7}
            step={1}
            max={365}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
        </Box>
        {chartData ? (
          displayGraph()
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress color="inherit" />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default FuelGraph;
