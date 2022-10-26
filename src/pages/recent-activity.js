import React, { useEffect, useState  } from 'react'
import Head from 'next/head'
import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  Container,
  TableContainer,
  ToggleButton,
  Typography,
  ToggleButtonGroup
} from '@mui/material';
import ActivityDataLine from '../components/activity/activityDataLine'
import ActivityTopTile from '../components/activity/activitytopTile'
import LoadingSVG from '../components/loading/loadingSVG'
import { truncate } from '../utils/helpers'
import NoTickets from '../components/activity/noTickets'
import { DashboardLayout } from '../components/dashboard-layout'

const RecentMints = ({ wsdata }) => {
  const [recentUsage, setRecentUsageList] = useState(wsdata.usageEvents)
  const [currentType, setCurrentType] = useState("ALL")
  
  const [loading, setLoading] = useState(false)

  const handleChange = (event, type) => {
    if (type === "ALL") {
      setRecentUsageList(wsdata.usageEvents)
      setCurrentType(type)
    } else if (type === null) {
      setRecentUsageList(wsdata.usageEvents)
      setCurrentType("ALL")
    } else {
      setRecentUsageList(wsdata.usageEvents.filter(a => a.type === type))
      setCurrentType(type)
    }  
  };

  useEffect(() => {
    setRecentUsageList(wsdata.usageEvents)
    setLoading(true)
  }, [] )

  function displayRecentActivity() {
    return (<>
      <Typography gutterBottom
          variant="p"
          component="div"
          margin={2}
          marginBottom={0}
        >
          Sort by
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={currentType}
          exclusive
          onChange={handleChange}
          sx={{ padding: 2 }}
        >
          <ToggleButton value={"ALL"}>ALL</ToggleButton>
          <ToggleButton value={"SOLD"}>Sold</ToggleButton>
          <ToggleButton value={"RESOLD"}>Re-Sold</ToggleButton>
          <ToggleButton value={"SCANNED"}>Scanned</ToggleButton>
          <ToggleButton value={"INVALIDATED"}>Invalidated</ToggleButton>
          <ToggleButton value={"CHECKED IN"}>Checked In</ToggleButton>
        
        </ToggleButtonGroup>
      {recentUsage.length > 1 ?
        <Container maxWidth={false}>
          <Grid container
            spacing={4}
            marginBottom={2}
          >
            {
              recentUsage.slice(0, 4).map(usage => (
                <ActivityTopTile
                  key={usage.nftId}
                  blockTimestamp={usage.blockTimestamp}
                  eventName={truncate(usage.event.name, 10)}
                  integrator={usage.event.integrator.name}
                  getUsed={usage.getUsed}
                  activityType={usage.type}
                  price={usage.price}
                  imageUrl={usage.event.imageUrl}
                />
              ))
            }
          </Grid>
          <Box >
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Block Timestamp
                    </TableCell>
                    <TableCell>
                      Event Name
                    </TableCell>
                    <TableCell>
                      Integrator
                    </TableCell>
                    <TableCell>
                      Price
                    </TableCell>
                    <TableCell>
                      GET Used
                    </TableCell>
                    <TableCell>
                      Activity Type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    recentUsage.slice(0, 250).map(usage => (
                      <ActivityDataLine
                        key={usage.nftId}
                        blockTimestamp={usage.blockTimestamp}
                        eventName={truncate(usage.event.name, 15)}
                        integrator={usage.event.integrator.name}
                        getUsed={usage.getUsed}
                        activityType={usage.type}
                        price={usage.price}
                        nftId={usage.nftId}
                        eventID={usage.event.id}
                        integratorID={usage.event.integrator.id}
                      />
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
        :
        <NoTickets
          type={currentType}
        />}
    </>
    )
  }

  return (
    <>
      {loading ? displayRecentActivity() :
        <LoadingSVG />
      }
    </>
  )
};

RecentMints.getLayout = (page) => (
  <>
  <Head>
    <title>
      Recent Activity | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
    </DashboardLayout>
  </>
);

export default RecentMints
