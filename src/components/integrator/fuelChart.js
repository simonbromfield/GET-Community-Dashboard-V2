import React from 'react';
import { useState, useEffect } from "react"
import { Chart as ChartJS } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2';
import {
  Box,
  Container,
  CardHeader
} from '@mui/material';
import { protocolDayToDate } from '../../utils/helpers'

const TicketsSoldApp = (props) => {
  let { data, title } = props

  const [chartData, setChartData] = useState({
      labels: [
        'Reserved',
        'Spent',
        'Available'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [data.reservedFuel, data.spentFuel, data.availableFuel],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
  })

  const displayGraph = () => {
    return (
      <>
        <CardHeader
          title={title}
        />
        <Container>
        <Pie
          data={chartData} />
          </Container>
      </>
    )
  }

  return <div>
          { chartData ? displayGraph() :
            <Box sx={{ display: 'flex' }}>
              <CircularProgress color="inherit" />
            </Box>
          }
        </div>
}

export default TicketsSoldApp
