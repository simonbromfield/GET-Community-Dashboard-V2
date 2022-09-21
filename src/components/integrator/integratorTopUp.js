import Moment from 'moment'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@mui/material';

function IntegratorTopUp(props) {
  const {
    topUps
  } = props;

  return (
    <Card sx={{
      marginTop: 3
    }}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            TOP UPS
          </Typography>          
        </Box>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>
                Block Timestamp
              </TableCell>
              <TableCell>
                GET value
              </TableCell>
              <TableCell>
                USD value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              topUps.map(topUP => (
              <>
              <TableRow hover >
                <TableCell>
                    {topUP.blockTimestamp}
                </TableCell>
                <TableCell>
                    {Number(topUP.total).toFixed(3)}GET
                </TableCell>
                <TableCell>
                    ${Number(topUP.totalUsd).toFixed(2)}
                </TableCell>
              </TableRow> 
              </>  
            ))
          }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default IntegratorTopUp