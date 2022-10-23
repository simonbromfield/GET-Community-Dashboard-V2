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
  TableContainer
} from '@mui/material';
import ActivityDataLine from '../components/activity/activityDataLine'
import ActivityTopTile from '../components/activity/activitytopTile'
import ActivityTypeNav from '../components/activity/activityTypeNav'
import LoadingSVG from '../components/loading/loadingSVG'
import { truncate } from '../utils/helpers'
import NoTickets from '../components/activity/noTickets'
import { DashboardLayout } from '../components/dashboard-layout'

const RecentMints = ({ wsdata }) => {
  const [recentUsage, setRecentUsageList] = useState(wsdata.usageEvents)
  const [originalUsageData, setOriginalUsageData] = useState(wsdata.usageEvents)
  const [currentType, setCurrentType] = useState(null)
  
  const [loading, setLoading] = useState(false)

  function recentUsageFunction(type) {
    if (!type) {
      setRecentUsageList(originalUsageData)
      setLoading(true)
    } else {
      let result = originalUsageData.filter(obj => {
        return obj.type === String(type)
      })
      setCurrentType(String(type))
      setRecentUsageList(result)
      setLoading(true)
    }
  }


  useEffect(() => {
    setRecentUsageList(wsdata.usageEvents)
    setOriginalUsageData(wsdata.usageEvents)
    setLoading(true)
  }, [] )

  function displayRecentActivity() {
    return (<>
      <ActivityTypeNav
        recentUsageFunction={recentUsageFunction}
        setLoading={setLoading}
      />
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
                    recentUsage.slice(4, 50).map(usage => (
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
