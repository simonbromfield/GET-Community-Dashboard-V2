import React from 'react'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

function ActivityTypeNav(props) {

  const soldStyle = {
    backgroundColor: '#59C399',
    color: 'white'
  };
  const resoldStyle = {
    backgroundColor: '#E857BB',
    color: 'white'
  };
  const scannedStyle = {
    backgroundColor: '#E8A845',
    color: 'white'
  };
  const invalidatedStyle = {
    backgroundColor: '#EC5F58',
    color: 'white'
  };
  const checkedInStyle = {
    backgroundColor: '#325FEB',
    color: 'white'
  };
  const claimedStyle = {
    backgroundColor: '#6EB7E4',
    color: 'white'
  };

  return (
    <>
<Container maxWidth="">
        <Grid container
          spacing={1}
          margin={1}
        >
          <Grid item
            lg={2}
            sm={4}
            xl={2}
            xs={4}
          >
            <Chip sx={soldStyle}
              label="SOLD" />
          </Grid>
          <Grid item
            lg={2}
            sm={4}
            xl={2}
            xs={4}
          >
            <Chip sx={resoldStyle}
              label="RESOLD" />
          </Grid>
          <Grid item
            lg={2}
            sm={4}
            xl={2}
            xs={4}
          >
            <Chip sx={scannedStyle}
              label="SCANNED" />
          </Grid>
          <Grid item
            lg={2}
            sm={4}
            xl={2}
            xs={4}
          >
            <Chip sx={invalidatedStyle}
              label="INVALIDATED" />
          </Grid>
          <Grid item
            lg={2}
            sm={4}
            xl={2}
            xs={4}
          >
            <Chip sx={checkedInStyle}
              label="CHECKED IN" />
          </Grid>
          <Grid item
            lg={2}
            sm={4}
            xl={2}
            xs={4}
          >
            <Chip sx={claimedStyle}
              label="CLAIMED" />
          </Grid>
        </Grid>
    </Container>
    </>
  )
}

export default ActivityTypeNav
