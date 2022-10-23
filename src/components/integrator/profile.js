import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import LineGraph from '../dashboard/line'
import FuelChart from '../integrator/fuelChart'
import LoadingSVG from '../loading/loadingSVG'
import NotFound from './notFound'
import EventDataLine from './eventDataLine'

const Profile = (props) => {
  const { id, wsdata } = props;
  const [profileData, setProfileData] = useState(wsdata.integrators.find(x => x.id === id))
  const [eventList, setEventList]= useState(profileData.events.slice(0, 10))
  const [found, setFound] = useState(true)
  
  useEffect(() => {
    setProfileData(wsdata.integrators.find(x => x.id === id))
    setEventList(profileData.events.slice(0, 10))
    if (!profileData) {
      setFound(false)
    }
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
        <Grid container
          sx={{marginTop: 2, marginBottom: 4}}
        >
        <Card>
        <CardHeader
          title="Top 10 events by reserved fuel."
                  />
                  <TableContainer>
                    <Table >
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Event Name
                          </TableCell>
                          <TableCell>
                            Fuel Reserved
                          </TableCell>
                          <TableCell>
                            Tickets Sold
                          </TableCell>
                          <TableCell>
                            Link
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {
                          eventList.slice(0, 30).map(event => (
                            <EventDataLine
                              key={event.id}
                              id={event.id}
                              eventName={event.name}
                              fuel={event.reservedFuel}
                              soldCount={event.soldCount}
                              link={`#`}
                            />
                          ))
                        } 
                      </TableBody>
                    </Table>
            </TableContainer>
            </Card>
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