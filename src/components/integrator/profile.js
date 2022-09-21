import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Typography
} from '@mui/material'
import AccountProfile from './account-profile';
import IntegratorTopUp from './integratorTopUp'

import axios from 'axios'
const getSubGraphURL = 'https://api.thegraph.com/subgraphs/name/getprotocol/get-protocol-subgraph'

const Profile = (props) => {
  const { id } = props;
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(false)
  const getProfileData = async (props) => {
    try {
      const data = await axios.post(getSubGraphURL, {
        query: `{
          integrators(where: {id: ${id}}){
            name
            availableFuel
            eventCount
          }
          topUpEvents(orderBy: blockTimestamp, orderDirection: desc, where: {integratorIndex: "${id}"}) {
            integratorIndex
            integrator{
              name
            }
            total
            totalUsd
            price
            blockTimestamp
          }
          integratorDays(
            orderBy: day
            orderDirection: desc
            first: 30
            where: {integrator: "${id}"}
          ) {
            day
            soldCount
          }
        }                  
        `
      }
      ).then(res => {
        setProfileData(res.data.data.integrators[0])
        console.log(res)
      })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (<>
    <Container maxWidth={false}>
      <Typography
        sx={{ mb: 3 }}
        variant="h4"
        >
          {profileData.name}
      </Typography>
          <Grid container spacing={3} >
        <Grid item lg={6} sm={12} xl={6} xs={12} >
          <AccountProfile 
            eventCount={profileData.eventCount}
            availableFuel={profileData.availableFuel}
          />
        </Grid>
        <Grid item lg={6} sm={12} xl={6} xs={12} >
        </Grid>
        </Grid>
  </Container>
  </>
  )
}

export default Profile