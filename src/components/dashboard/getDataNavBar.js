import React, { useEffect, useState } from 'react' 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'
import { Container } from '@mui/system';

import { numberWithCommas } from '../../utils/helpers'

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const DailyData = () => {
  const [soldCountItem, setSoldCount] = useState(null)
  const [reservedFuel, setReservedFuel] = useState(null)
  const [salesVolume, setSalesVolume] = useState(null)
  const [eventCount, setEventCount] = useState(null)
  
  const [loading, setLoading] = useState(false)

  const usageFunction = async () => {
    try {
      const data = await axios.post(getSubGraphURL, {
        query: `{
          protocolDays(orderBy: day, orderDirection: desc, first: 1) {
            soldCount
            eventCount
            reservedFuel
            totalSalesVolume
          }
} 
                `
      }
      ).then(res => {
        console.log(res)
        setSoldCount(numberWithCommas(res.data.data.protocolDays[0].soldCount))
        setReservedFuel(Number(res.data.data.protocolDays[0].reservedFuel).toFixed(4))
        setSalesVolume(Number(res.data.data.protocolDays[0].totalSalesVolume).toFixed(2))
        setEventCount(Number(res.data.data.protocolDays[0].eventCount))
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    usageFunction()
  }, [])

  const displayUsage = () => {
    return (
      <>
        <p sx={{
          padding: 2
        }}>TODAY: {soldCountItem} tickets sold | {reservedFuel} GET used | {eventCount} events created | ${salesVolume} sales volume  </p>
      </>
    )
  }

  return <Container>
    { loading ? displayUsage() :
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="inherit" />
      </Box>
    }
  </Container>
}

export default DailyData
