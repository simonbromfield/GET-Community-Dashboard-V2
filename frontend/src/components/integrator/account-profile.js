import { Box, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { numberWithCommas } from '../../utils/helpers';

function AccountProfile(props) {
  const { profileData } = props;

  return (
    <Card>
      <CardHeader title={`${profileData.eventCount} events`} />
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography color="textSecondary" variant="h4">
            {`${profileData.eventCount} events`}
          </Typography>
          <Typography color="textSecondary" variant="h7">
            {numberWithCommas(Number(profileData.availableFuel).toFixed(2))}{' '}
            $GET Available
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AccountProfile;
