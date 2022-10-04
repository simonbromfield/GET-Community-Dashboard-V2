import React from 'react';
import { useState, useEffect } from "react"
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Container
} from '@mui/material';


const TicketsSoldApp = (props) => {
  let { protocolDays } = props

  let sold = []
  protocolDays.map(x => (sold.push(x.soldCount)))
  let reSold = []
  protocolDays.map(x => (reSold.push(x.resoldCount)))
  let scanned = []
  protocolDays.map(x => (scanned.push(x.scannedCount)))
  let claimed = []
  protocolDays.map(x => (claimed.push(x.claimedCount)))
  
  const [chartData, setChartData] = useState({
    labels: ["1","2","3","4","5","6","7"],
    datasets: [{
      label: 'SOLD',
      data: sold,
      fill: false,
      borderColor: "#59C399",
      backgroundColor: "#59C399",
      tension: 0.2
    },{
      label: 'RE-SOLD',
      data: reSold,
      fill: false,
      borderColor: "#E857BB",
      backgroundColor: "#E857BB",
      tension: 0.2
    },{
      label: 'SCANNED',
      data: scanned,
      fill: false,
      borderColor: "#E8A845",
      backgroundColor: "#E8A845",
      tension: 0.2
    },{
      label: 'CLAIMED',
      data: claimed,
      fill: false,
      borderColor: "#6EB7E4",
      backgroundColor: "#6EB7E4",
      tension: 0.1
    }]
  })


  const displayGraph = () => {
    return (
      <>
        <Container>
        <Line
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
