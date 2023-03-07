import React from 'react';
import { truncate } from '../../utils/helpers';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import moment from 'moment';
import SoldChip from '../../components/topEvents/soldChip';
import ReSoldChip from '../../components/topEvents/ReSoldChip';
import ScannedChip from '../../components/topEvents/scannedChip';
import InvalidatedChip from '../../components/topEvents/invalidatedChip';
import CheckedInChip from '../../components/topEvents/checkedInChip';
import ClaimedChip from '../../components/topEvents/claimedChip';

import Stack from '@mui/material/Stack';

function TopEventCards(props) {
  let {
    key,
    rank,
    eventName,
    integrator,
    eventID,
    integratorID,
    imageUrl,
    createTx,
    getUsed,
    soldCount,
    reSoldCount,
    scannedCount,
    invalidatedCount,
    checkedInCount,
    claimedCount,
  } = props;

  const integratorLink = `/integrator/${integratorID}`;
  const eventLink = `/event/${eventID}`;
  const txLink = `https://polygonscan.com/tx/${createTx}`;

  if (imageUrl == '') {
    imageUrl = 'https://picsum.photos/300/200';
  }

  return (
    <>
      <Grid item
lg={4}
sm={6}
xl={3}
xs={12}>
        <Card sx={{ margin: 1 }}
key={key}>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom
variant="h6"
component="div">
              {truncate(eventName, 20)} | {truncate(integrator, 25)}
            </Typography>

            <Stack direction="column"
spacing={0.3}>
              <Chip icon={<LocalGasStationIcon />}
label={getUsed} />
              <SoldChip soldCount={`SOLD: ${soldCount}`} />
              <ReSoldChip reSoldCount={`RESOLD: ${reSoldCount}`} />
              <ScannedChip scannedCount={`SCANNED: ${scannedCount}`} />
              <CheckedInChip checkedInCount={`CHECKED IN: ${checkedInCount}`} />
              <ClaimedChip claimedCount={`ClAIMED: ${claimedCount}`} />
              <InvalidatedChip
                invalidatedCount={`INVALIDATED: ${invalidatedCount}`}
              />
            </Stack>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Button size="small"
href={integratorLink}>
              {truncate(integrator, 15)}
            </Button>
            <Button size="small"
href={eventLink}>
              View Event
            </Button>
            <Button size="small"
href={txLink}
target="_blank">
              TX
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

export default TopEventCards;
