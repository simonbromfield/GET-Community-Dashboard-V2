import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader
} from '@mui/material'
import AccountProfile from './account-profile';
import LineGraph from '../dashboard/line'
import FuelChart from '../integrator/fuelChart'
import IntegratorTopUp from './integratorTopUp'
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from "../../utils/config.json"

const Profile = (props) => {
  const { id } = props;
  const [profileData, setProfileData] = useState(false)
  
  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send("Index Page connected")
    };
    client.onmessage = (msg) => {
      let pageData = JSON.parse(msg.data)
      setProfileData(pageData.integrators.find(x => x.id === id))
    };
    client.onerror = function() {
      console.log('Connection Error');
    };

  }, [])

  return (<>
    {profileData ?
      <Container maxWidth={false}>
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          {profileData.name}
        </Typography>
        <Grid container
          spacing={3} >
          <Grid item
            lg={4}
            sm={12} >
            <Card
              sx={{
                height: '100%',
                marginBottom: 2
              }}
            >
            <FuelChart
              title={"Fuel"}
              data={profileData}
            />
            </Card>
          </Grid>
          <Grid item
            lg={8}
            sm={12} >
            <Card
              sx={{
                height: '100%',
                marginBottom: 2
              }}
            >
              <CardHeader
                title="Recent Activity">
              </CardHeader>
              <LineGraph
                protocolDays={profileData.integratorDays}
              />
            </Card>
           
          </Grid>
        </Grid>
      </Container>
      : null}
  </>
  )
}

export default Profile