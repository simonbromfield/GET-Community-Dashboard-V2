import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Grid
} from '@mui/material'
import { DashboardLayout } from '../components/dashboard-layout';
import LoadingSVG from '../components/loading/loadingSVG'
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from "../utils/config.json"
import IntegratorCard from '../components/integrator/card'

const Integrators = (props) => {
  const [integrators, setIntegrators] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send("Index Page connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      setIntegrators(pageData.integrators)
      setLoading(true)
    };
    client.onerror = function() {
      console.log('Connection Error');
    };
  }, [])

  const displayIntegrators = () => {
    return (
      <>
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
              {
                integrators.map(integrator => (
                  <IntegratorCard
                    key={integrator.id}
                    data={integrator}
                  />
                ))
                  }
              </Grid>
          </Container>
        </Box>
      </>      
    )
  }

  return (
    <>
      { loading ? displayIntegrators() :
        <LoadingSVG />
      }
    </>
  )
}

Integrators.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Integrators
