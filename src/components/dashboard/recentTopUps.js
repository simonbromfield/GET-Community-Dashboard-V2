import React, { useEffect, useState } from 'react' 
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  PerfectScrollbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const TokenTopUpsApp = () => {
  const [topUps, setTopUps] = useState(null)
  const [loading, setLoading] = useState(false)

  const topUpsFunction = async () => {
    try {
      const data = await axios.post(getSubGraphURL, {
        query: `
                  {
                    topUpEvents(orderBy: blockTimestamp, orderDirection: desc, first: 5) {
                      integratorIndex
                      integrator{
                        name
                      }
                      total
                      totalUsd
                      price
                    }
                  }
        
                `
      }
      ).then(res => {
        console.log(res)
        setTopUps(res.data.data.topUpEvents)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    topUpsFunction()
  }, [])

  return <div>
    <Card sx={{ height: '100%' }}>
        <CardContent>
            TOP UPS
      </CardContent>
    </Card>
  </div>
}

export default TokenTopUpsApp
