import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';

function AccountProfile(props) {
  const {
    profileName,
    eventCount,
    availableFuel
  } = props;

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            color="textSecondary"
            variant="h4"
          >
            {`${eventCount} events`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h7"
          >
            {availableFuel} $GET Available
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AccountProfile