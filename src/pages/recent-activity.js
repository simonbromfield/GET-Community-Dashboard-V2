import React, { useEffect, useState, CSSProperties  } from 'react'
import axios from 'axios'
import Moment from 'moment'
import Head from 'next/head'
import {
  Box,
  CardHeader,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  Container
} from '@mui/material';
import ActivityDataLine from '../components/activity/activityDataLine'
import ActivityTopTile from '../components/activity/activitytopTile'
import LoadingSVG from '../components/loading/loadingSVG'
import { truncate } from '../utils/helpers'
import TableContainer from '@mui/material/TableContainer'

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

import { DashboardLayout } from '../components/dashboard-layout'

const RecentMints = (props) => {
  const [recentUsage, setRecentUsageList] = useState(null)
  const [latestUpdate, setlatestUpdate] = useState(null)
  const [newestItem, setNewestItem] = useState(null)
  const [loading, setLoading] = useState(false)


  const recentUsageFunction = async () => {
    try {
      await axios.post(getSubGraphURL, {
        query: `
        {
          usageEvents(orderBy: blockTimestamp, orderDirection: desc, first: 100, where: { type_not: EVENT_CREATED  }) {
            blockTimestamp
            type
            nftId
            integrator{
              id
              name
            }
            event {
              id
              name
              imageUrl
            }
            getUsed
            getUsedProtocol
            price
          }
        }
                `
      }
      ).then(res => {
        let currentDate = new Date()
        setRecentUsageList(res.data.data.usageEvents)
        setNewestItem(res.data.data.usageEvents[[res.data.data.usageEvents.length - 1]].blockTimestamp)
        setlatestUpdate(`Recent Activity: updated ${Moment(currentDate).format("hh:mm:ss a")}.`)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    recentUsageFunction()
    const interval = setInterval(() => {
      recentUsageFunction()
    }, 50000);
    return () => clearInterval(interval);
  }, [])

  function displayRecentActivity() {
    return (<>
      < CardHeader
        title={latestUpdate}
      />
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
                integrator={usage.integrator.name}
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
                recentUsage.slice(4).map(usage => (
                  <ActivityDataLine
                    key={usage.nftId}
                    blockTimestamp={usage.blockTimestamp}
                    eventName={truncate(usage.event.name, 15)}
                    integrator={usage.integrator.name}
                    getUsed={usage.getUsed}
                    activityType={usage.type}
                    price={usage.price}
                    nftId={usage.nftId}
                    eventID={usage.event.id}
                    integratorID={usage.integrator.id}
                  />
                ))
              }
            </TableBody>
            </Table>
            </TableContainer>
          </Box>
          </Container>
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
