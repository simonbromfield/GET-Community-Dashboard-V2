import React, { useEffect, useState } from 'react'
import LoadingSVG from '../components/loading/loadingSVG'
import Head from 'next/head'
import LineGraph from '../components/dashboard/line'

import {
  Box,
  Container,
  TableContainer,
  Card,
  Grid,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  List,
  Divider,
  ListItemButton,
  ListItemText,
  Button,
  CardContent
} from '@mui/material'
import TopUpDataLine from '../components/topUps/topups'
import TotalTicketsSold from '../components/dashboard/totalTicketsSold'
import moment from 'moment'
import TokenPrice from '../components/dashboard/tokenPrice'
import MarketCapApp from '../components/dashboard/marketCap'
import { truncate } from '../utils/helpers'
import { DashboardLayout } from '../components/dashboard-layout'
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from "../utils/config.json"

const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};

const Index = (props) => {
  const [protocolData, setProtocolData] = useState(false)
  const [protocolDays, setProtocolDays] = useState(false)
  const [topUps, setTopUps] = useState(false)
  const [integrators, setIntegrators] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send("Index Page connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      console.log(pageData)
      setProtocolData(pageData.protocol)
      setIntegrators(pageData.integrators)
      setTopUps(pageData.topUpEvents)
      setProtocolDays(pageData.protocolDays)
      setLoading(true)
    };
    client.onerror = function() {
      console.log('Connection Error');
    };
  }, [])

  const displayIndexPage = () => {
    return (
      <>
        {console.log(topUps)}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <Grid
              container
              spacing={3}
            >
              <Grid item
                lg={3}
                sm={12}
                xs={12}>
            
                <TotalTicketsSold
                  sx={{ height: '100%' }}
                  protocolData={protocolData}
                />
            
              </Grid>
              <Grid item
                lg={6}
                sm={12}
                xs={12}>
                <Card
                  sx={{
                    height: '100%',
                    marginBottom: 2
                  }}
                >
                  <LineGraph
                    protocolDays={protocolDays}
                  />
              </Card>
              </Grid>
              <Grid item
                lg={3}
                sm={12}
                xs={12}
              >
                <Card
                sx={{
                  height: '100%',
                  marginBottom: 2
                  }}
                >
                  <CardContent>
                    <TokenPrice sx={{ height: '100%' }} />
                    <MarketCapApp sx={{ height: '100%' }} />
                  </CardContent>
                </Card>     
              </Grid>
              <Grid
                item
                lg={8}
                xs={12}
              >
                <Card sx={{
                  margin: 2
                }}>
                  <CardHeader
                    title="Recent Integrator Top Ups"
                  />
                  <TableContainer>
                    <Table >
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Time / Date
                          </TableCell>
                          <TableCell>
                            Integrator
                          </TableCell>
                          <TableCell>
                            GET Price
                          </TableCell>
                          <TableCell>
                            GET Total
                          </TableCell>
                          <TableCell>
                            Total $
                          </TableCell>
                          <TableCell>
                            TX
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                         {
                          topUps.slice(0, 5).map(topUp => (
                            <TopUpDataLine
                              key={topUp.id}
                              blockTimestamp={moment.unix(topUp.blockTimestamp).format("HH:mm : DD/MM/YY")}
                              intagrator={topUp.integrator.name}
                              intagratorLink={`/integrator/${topUp.integrator.id}`}
                              getPrice={Number(topUp.price).toFixed(2)}
                              total={Number(topUp.total).toFixed(4)}
                              totalUsd={Number(topUp.totalUsd).toFixed(2)}
                              txlink={`https://polygonscan.com/tx/${topUp.txHash}`}
                            />
                          ))
                        }
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                        <Button
                            size="large"
                            href="/top-ups/"
                          >
                            View more
                          </Button>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
              <Grid
                item
                lg={4}
                xs={12}
              >
                <Card sx={{
                margin: 2
              }}>
              <CardHeader
                title="Integrators"
                />

                <List sx={style}
                  component="nav"
                  aria-label="mailbox folders"
                >
                <Divider />
                {
                  integrators.map(integrator => (
                    <>
                        <ListItemButton component="a"
                          href={`/integrator/${integrator.id}`}>
                          <ListItemText
                            primary={truncate(integrator.name, 25)}
                          />
                        </ListItemButton>
                      <Divider />
                    </>
                  ))
                }
                </List>
              </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    )
  }

  return (
    <>
        { loading ? displayIndexPage() :
          <LoadingSVG />
        }
    </>
  )
}


Index.getLayout = (page) => (
  <>
  <Head>
    <title>
      Dashboard | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default Index