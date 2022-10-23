import React from 'react'
import { truncate } from '../../utils/helpers'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import EventIcon from '@mui/icons-material/Event';
import moment from 'moment';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function EventCards(props) {
  let { key,
    eventName,
    integrator,
    eventID,
    integratorID,
    imageUrl,
    createTx,
    startTime,
    shopUrl
  } = props;
  
  const integratorLink = `/integrator/${integratorID}`
  const eventLink = `/event/${eventID}`
  const txLink = `https://polygonscan.com/tx/${createTx}`
  
  function isInThePast(date) {
    const today = new Date();
    return date < today;
  }

  const eventLive = isInThePast(new Date(moment.unix(startTime)))

  if (imageUrl == "") {
    imageUrl = "https://picsum.photos/300/200";
  } 

  return (
    <>
      <Grid item
        lg={4}
        sm={6}
        xl={3}
        xs={12} >
        <Card sx={{ margin: 1 }}
          key={key} >
        <CardMedia
          component="img"
          height="190"
          image={imageUrl}
          alt={eventName}
        />
          <CardContent>
          <Button
                size="medium"
                href={integratorLink}
                sx={{
                  margin: 0.3,
                  backgroundColor: "none",
                  color: "#64B292",
                  '&:hover': {
                    background: "none",
                  }
                }}
              >
                <BookOnlineIcon /> {truncate(integrator, 15)}
            </Button>
            <br />
            <Chip
              icon={<EventIcon />}
              label={moment.unix(startTime).format("DD/MM/YY")}
              sx={{
                margin: 2,
                marginLeft: 0
              }}
            />
            { !eventLive ?
              <Chip
                label="ACTIVE"
                sx={{
                  margin: 1,
                  backgroundColor: "#118E29",
                  color: "white"
                }}
              />
              :
              <Chip
                label="ENDED"
                sx={{
                  margin: 1,
                  backgroundColor: "#962020",
                  color: "white"
                }}
              />
            }
            <Stack spacing={0}>
              <Button
                size="large"
                href={eventLink}
                sx={{
                  margin: 0.3,
                  backgroundColor: "none",
                  color: "#170742",
                  '&:hover': {
                    background: "none",
                  }
                }}
              >
                {truncate(eventName, 25)}
              </Button>
            </Stack>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
          <Button
            href={txLink}
            target="_blank"
          >
          <OpenInNewIcon />
          </Button>
            <Button
              size="small"
              href={shopUrl}
              target="_blank"
            >Visit ticket shop</Button>
            
            </CardActions>
          </Card> 
    </Grid>
  </>
  )
}

export default EventCards
