import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../components/dashboard-layout';
import {
  Box,
  Grid,
  CardHeader,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  ToggleButton,
  Typography,
  ToggleButtonGroup
} from '@mui/material'
import Head from 'next/head'
import LeaderboardDataLine from '../components/leaderboard/dataline'
import moment from 'moment'
import TableContainer from '@mui/material/TableContainer'
import {
  truncate,
  numberWithCommas
} from '../utils/helpers'
import LoadingSVG from '../components/loading/loadingSVG'
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};

const Leaderboards = ({ wsdata }) => {
  const [leaderboard, setLeaderboard] = useState(wsdata.allTimeTop)
  const [loading, setLoading] = useState(false)
  const [currentBoard, setCurrentBoard] = useState("ALL TIME")

  const handleChange = (event, type) => {
    if (type === "ALL TIME") {
      setCurrentBoard("ALL TIME")
      setLeaderboard(wsdata.allTimeTop)
    } else if (type === "LAST 7 DAYS") {
      setCurrentBoard("LAST 7 DAYS")
      //// Populate the data for last 7 days
    } else if (type === "YESTERDAY") {
      setCurrentBoard("YESTERDAY")
      //// Populate the data for last 1 day
    } else {
      setCurrentBoard("ALL TIME")
      //// Populate the data for all time
    }  
  };

  useEffect(() => {
    setLeaderboard(wsdata.allTimeTop)
    setLoading(true)
  }, [])

  const displayTopUps = () => {
    return (
      <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%"
        }}
      >
          <Grid container
            spacing={2}
          >
          <Grid item
            lg={12}
            md={12}
            xl={12}
            xs={12}>
              <Card sx={{
                margin: 2
              }}>
                <ToggleButtonGroup
                  color="primary"
                  value={currentBoard}
                  exclusive
                  onChange={handleChange}
                  sx={{ padding: 2 }}
                >
                  <ToggleButton value={"ALL TIME"}>All Time</ToggleButton>
                  <ToggleButton value={"LAST 7 DAYS"}>Last 7 days</ToggleButton>
                  <ToggleButton value={"YESTERDAY"}>Yesterday</ToggleButton>
                </ToggleButtonGroup>
                <CardHeader title={`Leaderbaord - ${currentBoard}`}>
                
                </CardHeader>
                <TableContainer>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          #
                        </TableCell>
                        <TableCell>
                          Event Name
                        </TableCell>
                        <TableCell>
                          Integrator
                        </TableCell>
                        <TableCell>
                          GET Reserved
                        </TableCell>
                        <TableCell>
                          Tickets
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      leaderboard.map((event, index) => (
                        <LeaderboardDataLine
                          key={index}
                          postion={index+1}
                          eventName={truncate(event.name, 22)}
                          eventLink={`/event/${event.id}`}
                          intagrator={event.integrator.name}
                          intagratorLink={`/integrator/${event.integrator.id}`}
                          fuel={numberWithCommas(Number(event.reservedFuel).toFixed(2))}
                          soldCount={numberWithCommas(Number(event.soldCount))}
                        />
                      ))
                      }
                    </TableBody>
                  </Table>
                  </TableContainer>
              </Card>
            </Grid>
          </Grid>
          </Box>
      </>      
    )
  }

  return (
    <>
        { loading ? displayTopUps() :
          <LoadingSVG />
        }
    </>
  )
}

Leaderboards.getLayout = (page) => (
  <>
  <Head>
    <title>
      Leaderboards | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default Leaderboards
