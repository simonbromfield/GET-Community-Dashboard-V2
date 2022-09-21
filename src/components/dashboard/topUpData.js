import React from 'react'
import { Card, CardContent } from '@mui/material';

const TicketsSoldApp = (props) => {
  return <div>
    <Card sx={{ height: '100%' }} >
      <CardContent>
        <h2>This is the data component</h2> 
        {console.log(`This is the data from parent ${parentToChild}`)}
      </CardContent>
    </Card>
  </div>
}

export default TicketsSoldApp




// < CardHeader title = "Latest Orders" />
//           <PerfectScrollbar>
//             <Box sx={{ minWidth: 800 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       Integrator
//                     </TableCell>
//                     <TableCell>
//                       Top Up Amount
//                     </TableCell>
//                     <TableCell>
//                       Total value
//                     </TableCell>
//                     <TableCell>
//                       Token Price
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {topUps.map((topUp) => (
//                     <TableRow
//                       hover
//                       key={topUp.id}
//                     >
//                       <TableCell>
//                         {topUp.integrator.name}
//                       </TableCell>
//                       <TableCell>
//                         {topUp.total}
//                       </TableCell>
//                       <TableCell>
//                         {topUp.totalUsd }
//                       </TableCell>
//                       <TableCell>
//                         {topUp.price}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </PerfectScrollbar>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'flex-end',
//               p: 2
//             }}
//           >
//             <Button
//               color="primary"
//               endIcon={<ArrowRightIcon fontSize="small" />}
//               size="small"
//               variant="text"
//             >
//               View all
//             </Button>
//           </Box> */