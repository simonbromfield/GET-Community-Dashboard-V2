import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  Chip
} from '@mui/material'
import LineGraph from '../dashboard/line'
import FuelChart from '../integrator/fuelChart'
let W3CWebSocket = require('websocket').w3cwebsocket;
import configData from "../../utils/config.json"
import LoadingSVG from '../loading/loadingSVG'
import NotFound from './notFound'

const Profile = (props) => {
  const { id } = props;
  const [profileData, setProfileData] = useState(false)
  const [found, setFound] = useState(true)
  
  useEffect(() => {
    const client = new W3CWebSocket(configData.WS_URL);
    client.onopen = () => {
      client.send("Index Page connected")
    };
    client.onmessage = async (msg) => {
      let pageData = await JSON.parse(msg.data)
      setProfileData(pageData.integrators.find(x => x.id === id))
      if (!profileData) {
        setFound(false)
        console.log(found)
      }
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
              title={`${profileData.name}'s Fuel`}
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
              
              <LineGraph
                protocolDays={profileData.integratorDays}
              />
            </Card>
           
          </Grid>
        </Grid>
      </Container>
      :
      found ? 
        <LoadingSVG />
        :
        <NotFound />}
  </>
  )
}

export default Profile