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

const TicketsSoldApp = (props) => {
  let { protocolDays } = props

  let sold = []
  protocolDays.map(x => (sold.push(x.soldCount)))
  let reSold = []
  protocolDays.map(x => (reSold.push(x.resoldCount)))
  let scanned = []
  protocolDays.map(x => (scanned.push(x.scannedCount)))
  
  let days = []
  protocolDays.map(x => (days.push(protocolDayToDate(x.day))))
  
  const [chartData, setChartData] = useState({
    labels: days.reverse(),
    datasets: [{
      label: 'SOLD',
      data: sold.reverse(),
      fill: false,
      borderColor: "#59C399",
      backgroundColor: "#59C399",
      tension: 0.2
    },{
      label: 'RE-SOLD',
      data: reSold.reverse(),
      fill: false,
      borderColor: "#E857BB",
      backgroundColor: "#E857BB",
      tension: 0.2
    },{
      label: 'SCANNED',
      data: scanned.reverse(),
      fill: false,
      borderColor: "#E8A845",
      backgroundColor: "#E8A845",
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
          { chartData ? displayGraph() :
            <Box sx={{ display: 'flex' }}>
              <CircularProgress color="inherit" />
            </Box>
          }
        </div>
}

export default TicketsSoldApp
