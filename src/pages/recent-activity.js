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
import ActivityTypeNav from '../components/activity/activityTypeNav'
import LoadingSVG from '../components/loading/loadingSVG'
import { truncate } from '../utils/helpers'
import TableContainer from '@mui/material/TableContainer'
let W3CWebSocket = require('websocket').w3cwebsocket;

const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

import { DashboardLayout } from '../components/dashboard-layout'

const RecentMints = (props) => {
  const [recentUsage, setRecentUsageList] = useState(null)
  const [latestUpdate, setlatestUpdate] = useState(null)

  const [loading, setLoading] = useState(false)

  // const recentUsageFunction = async (activityType) => {    
  //   try {
  //     await axios.post(getSubGraphURL, {
  //       query: `
  //       {
  //         usageEvents(orderBy: blockTimestamp, orderDirection: desc, first: 100, where: { type: ${activityType} }) {
  //           blockTimestamp
  //           type
  //           nftId
  //           integrator{
  //             id
  //             name
  //           }
  //           event {
  //             id
  //             name
  //             imageUrl
  //           }
  //           getUsed
  //           getUsedProtocol
  //           price
  //         }
  //       }
  //               `
  //     }
  //     ).then(res => {
  //       let currentDate = new Date()
  //       setRecentUsageList(res.data.data.usageEvents)
  //       setlatestUpdate(`Recent Activity: updated ${Moment(currentDate).format("hh:mm:ss a")}.`)
  //     })
  //     setLoading(true)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:3001/');
    client.onopen = () => {
      client.send("Recent Activity Page connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      setRecentUsageList(pageData.usageEvents)
      setLoading(true)
    };
    client.onerror = function() {
      console.log('Connection Error');
    };

  }, [] )

  function displayRecentActivity() {
    return (<>
      {/* <ActivityTypeNav
        recentUsageFunction={recentUsageFunction}
        setLoading={setLoading}
      /> */}
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
                recentUsage.map(usage => (
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
