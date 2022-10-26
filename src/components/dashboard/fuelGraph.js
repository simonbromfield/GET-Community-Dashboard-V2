import React from 'react';
import { useState, useEffect } from "react"
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Container
} from '@mui/material';
import { protocolDayToDate } from '../../utils/helpers'

const FuelGraph = (props) => {
  let { protocolDays } = props

  let fuel = []
  protocolDays.map(x => (fuel.push(x.reservedFuel)))
  
  let days = []
  protocolDays.map(x => (days.push(protocolDayToDate(x.day))))
  
  const [chartData, setChartData] = useState({
    labels: days.reverse(),
    datasets: [{
      label: 'GET Reserved',
      data: fuel.reverse(),
      fill: false,
      borderColor: "#1E193B",
      backgroundColor: "#1E193B",
      tension: 0.2
    }]
  })

  const displayGraph = () => {
    return <>
      <Line
          data={chartData}
          />
      </>
  }

  return <div>
    <Container>
      { chartData ? displayGraph() :
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="inherit" />
        </Box>
      }
      </Container>
    </div>
}

export default FuelGraph
