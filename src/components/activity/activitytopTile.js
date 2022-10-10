import React from 'react'
import Moment from 'moment'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material';
import { numberWithCommas, truncate } from '../../utils/helpers'

function ActivityTopTile(props) {
  const { key, blockTimestamp, eventName, integrator, getUsed, activityType, imageUrl } = props;
  
  return (
    <>
      {(() => {
        
        switch (activityType) {
          case 'SOLD':
              return (
                <Grid item
                  lg={3}
                  sm={3}
                  xl={3}
                  xs={6}
                  key={key}
                >
                  <Card sx={{
                    height: '100%',
                    border: '5px solid #59C399',
                    }} >
                    <CardContent>
                    <Chip sx={{
                      background: '#59C399',
                      marginRight: 2
                    }}
                    label={activityType} />
                    <small>{Moment.unix(blockTimestamp).format("hh:mm:ss a")}</small><br />
                    <h3>{eventName}</h3>
                    <p><strong>{integrator}</strong></p>
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        maxWidth: { xs: 350, md: 250 }
                      }}
                      alt={eventName}
                      src={imageUrl}
                    />
                    <small>GET used: {getUsed}</small>
                    </CardContent>
                    </Card>
                </Grid>
                )
          case 'RESOLD':
              return (
                <Grid item
                lg={3}
                sm={3}
                xl={3}
                xs={6}
                key={key}
                >
                  <Card sx={{
                    height: '100%',
                    border: '5px solid #CA60A1',
                  }}>
                  <CardContent>
                    <Chip sx={{
                      background: '#CA60A1',
                      marginRight: 2
                    }}
                    label={activityType} />
                    <small>{Moment.unix(blockTimestamp).format("hh:mm:ss a")}</small><br />
                    <h3>{eventName}</h3>
                    <p><strong>{integrator}</strong></p>
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 }
                      }}
                      alt={eventName}
                      src={imageUrl}
                    />
                    <small>GET used: {getUsed}</small>
                    </CardContent>
                  </Card>
                </Grid>
              )
          case 'SCANNED':
              return (
                <Grid item
                lg={3}
                sm={3}
                xl={3}
                xs={6}
                key={key}
                >
                  <Card sx={{
                    height: '100%',
                    border: '5px solid #E8A845',
                    padding: 2
                  }}>
                  <CardContent>
                    <Chip sx={{
                      background: '#E8A845',
                      marginRight: 2
                    }}
label={activityType} />
                    <small>{Moment.unix(blockTimestamp).format("hh:mm:ss a")}</small><br />
                    <h3>{eventName}</h3>
                    <p><strong>{integrator}</strong></p>
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 }
                      }}
                      alt={eventName}
                      src={imageUrl}
                    />
                    <small>GET used: {getUsed}</small>
                    </CardContent>
                  </Card>
                </Grid>
                )
          case 'INVALIDATED':
              return (
                <Grid item
                lg={3}
                sm={3}
                xl={3}
                xs={6}
                key={key}
                >
                  <Card sx={{
                    border: '5px solid #EC5F58',
                    background: '#EC5F58',
                    color: 'white',
                    height: '100%'
                  }}>
                    <CardContent>
                    <small>{Moment.unix(blockTimestamp).format("hh:mm:ss a")}</small><br />
                    <h3>{eventName}</h3>
                    <p><strong>{integrator}</strong></p>
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 }
                      }}
                      alt={eventName}
                      src={imageUrl}
                    />
                    <small>GET used: {getUsed}</small>
                    </CardContent>
                  </Card>
                </Grid>
              )
          case 'CHECKED_IN':
                return (
                  <Grid item
                  lg={3}
                  sm={3}
                  xl={3}
                  xs={6}
                  key={key}
                  >
                  <Card sx={{
                      border: '5px solid #325FEB',
                    height: '100%'
                    }}>
                    <CardContent>
                    <Chip sx={{
                      background: '#325FEB',
                      marginRight: 2
                    }}
                    label={activityType} />
                    <small>{Moment.unix(blockTimestamp).format("hh:mm:ss a")}</small><br />
                    <h3>{eventName}</h3>
                    <p><strong>{integrator}</strong></p>
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 }
                      }}
                      alt={eventName}
                      src={imageUrl}
                    />
                    <small>GET used: {getUsed}</small>
                    </CardContent>
                  </Card>
                </Grid>
                  )
          case 'CLAIMED':
                return (
                  <Grid item
                  lg={3}
                  sm={3}
                  xl={3}
                  xs={6}
                  key={key}
                  >
                  <Card sx={{
                    border: '5px solid #6EB7E4',
                    padding: 2
                  }}>
                    <small>{Moment.unix(blockTimestamp).format("hh:mm:ss a")}</small><br />
                    <h3>{eventName}</h3>
                    <p><strong>{integrator}</strong></p>
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 }
                      }}
                      alt={eventName}
                      src={imageUrl}
                    />
                    <small>GET used: {getUsed}</small>
                  </Card>
                </Grid>
                )
          default:
              return null
        }

      })()}     
    </>
  )
}

export default ActivityTopTile
