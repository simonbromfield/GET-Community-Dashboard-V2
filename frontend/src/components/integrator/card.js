import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import moment from 'moment';
import SoldChip from '../topEvents/soldChip';
import ReSoldChip from '../topEvents/ReSoldChip';
import ScannedChip from '../topEvents/scannedChip';
import CheckedInChip from '../topEvents/checkedInChip';

import Stack from '@mui/material/Stack';

import { numberWithCommas } from '../../utils/helpers';

const IntegratorCard = (props) => {
  const { data } = props;
  return (
    <Grid item
lg={3}
sm={12}
xs={12}>
      <Card>
        <CardContent>
          <Typography color="textPrimary"
variant="h5">
            {data.name}
          </Typography>
          <Stack direction="column"
spacing={0.3}>
            <ListItemText
              primary={numberWithCommas(Number(data.eventCount))}
              secondary={`events`}
            />
            <Chip
              icon={<LocalGasStationIcon />}
              label={`${numberWithCommas(
                Number(data.availableFuel).toFixed(2)
              )} available fuel`}
            />
            <SoldChip soldCount={`SOLD: ${numberWithCommas(data.soldCount)}`} />
            <ReSoldChip
              reSoldCount={`RESOLD: ${numberWithCommas(data.resoldCount)}`}
            />
            <ScannedChip
              scannedCount={`SCANNED: ${numberWithCommas(data.scannedCount)}`}
            />
            <CheckedInChip
              checkedInCount={`CHECKED IN: ${numberWithCommas(
                data.checkedInCount
              )}`}
            />
            <Button
              variant="outlined"
              href={`/integrator/${data.id}`}
              sx={{ marginTop: '10px' }}
            >
              View {data.name}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default IntegratorCard;
