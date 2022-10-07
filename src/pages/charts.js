import React, { useEffect, useState } from 'react'
import LoadingSVG from '../components/loading/loadingSVG'
import LineGraph from '../components/dashboard/line'
import {
  Container,
  Grid,
  Card
} from '@mui/material'
import Head from 'next/head'
import { DashboardLayout } from '../components/dashboard-layout';
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from "../utils/config.json"

const Charts = (props) => {
  const [protocolDays, setProtocolDays] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send("Index Page connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      console.log(pageData)
      setProtocolDays(pageData.protocolDays)

      setLoading(true)
    };
    client.onerror = function() {
      console.log('Connection Error');
    };
  }, [])
    
  const displayChartsPage = () => {
    return (
      <>
          <Container maxWidth={false}>
            <Grid
            container
            marginTop={2}
              spacing={3}
            >
              <Grid item
                lg={12}
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
          </Grid>
        </Container>
      </>
    )
  }

  return (
    <>
        { loading ? displayChartsPage() :
          <LoadingSVG />
        }
    </>
  )
}


Charts.getLayout = (page) => (
  <>
  <Head>
    <title>
      Charts | GET Protocol Community
    </title>
  </Head>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </>
);

export default Charts
