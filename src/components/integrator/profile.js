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
import {
  numberWithCommas,
  truncate
} from '../../utils/helpers'

const Profile = (props) => {
  const { id, wsdata } = props;
  const [profileData, setProfileData] = useState(wsdata.integrators.find(x => x.id === id))
  const [eventList, setEventList]= useState(profileData.events.slice(0, 10))
  const [found, setFound] = useState(true)
  
  useEffect(() => {
    setProfileData(wsdata.integrators.find(x => x.id === id))
    setEventList(profileData.events.slice(0, 30))
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
              title={`Top events by reserved fuel.`} />
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {
                          eventList.slice(0, 30).map(event => (
                            <EventDataLine
                              key={event.id}
                              id={event.id}
                              eventName={truncate(event.name, 20)}
                              fuel={numberWithCommas(Number(event.reservedFuel).toFixed(2))}
                              soldCount={numberWithCommas(Number(event.soldCount).toFixed(2))}
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