import React, { useEffect, useState, CSSProperties  } from 'react'
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
  Container,
  TableContainer
} from '@mui/material';
import ActivityDataLine from '../components/activity/activityDataLine'
import ActivityTopTile from '../components/activity/activitytopTile'
import ActivityTypeNav from '../components/activity/activityTypeNav'
import LoadingSVG from '../components/loading/loadingSVG'
import { truncate } from '../utils/helpers'
import NoTickets from '../components/activity/noTickets'
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from "../utils/config.json"

import { DashboardLayout } from '../components/dashboard-layout'

const RecentMints = (props) => {
  const [recentUsage, setRecentUsageList] = useState(null)
  const [originalUsageData, setOriginalUsageData] = useState(null)
  const [currentType, setCurrentType] = useState(null)
  
  const [latestUpdate, setlatestUpdate] = useState(null)

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
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send("Recent Activity Page connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      setRecentUsageList(pageData.usageEvents)
      setOriginalUsageData(pageData.usageEvents)
      setLoading(true)
    };
    client.onerror = function() {
      console.log('Connection Error');
    };

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
