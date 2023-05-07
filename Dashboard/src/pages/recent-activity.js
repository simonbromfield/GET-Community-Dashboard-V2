import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  Container,
  TableContainer,
  ToggleButton,
  Typography,
  ToggleButtonGroup,
} from '@mui/material';
import ActivityDataLine from '../components/activity/activityDataLine';
import LoadingSVG from '../components/loading/loadingSVG';
import { truncate } from '../utils/helpers';
import NoTickets from '../components/activity/noTickets';
import { DashboardLayout } from '../components/dashboard-layout';
import Pagination from '@mui/material/Pagination';

const itemsPerPage = 10;

const digitalTwinIds = ['3', '6'];

const RecentMints = ({ wsdata }) => {
  const [recentUsage, setRecentUsageList] = useState(wsdata.usageEvents);
  const [currentType, setCurrentType] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hideDigitalTwins, setHideDigitalTwins] = useState(false);

  const handleChange = (event, type) => {
    if (type === 'ALL') {
      setRecentUsageList(wsdata.usageEvents);
      setCurrentType(type);
    } else if (type === null) {
      setRecentUsageList(wsdata.usageEvents);
      setCurrentType('ALL');
    } else {
      setRecentUsageList(wsdata.usageEvents.filter((a) => a.type === type));
      setCurrentType(type);
    }
    setCurrentPage(0);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  useEffect(() => {
    setRecentUsageList(wsdata.usageEvents);
    setLoading(true);
  }, []);

  function displayRecentActivity() {
    const filteredUsage = recentUsage.filter(
      (u) => !hideDigitalTwins || !digitalTwinIds.includes(u.event.integrator.id)
    );
    const pageCount = Math.ceil(filteredUsage.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
      <>
        <ToggleButton
          value="hideDigitalTwins"
          onChange={() => setHideDigitalTwins(!hideDigitalTwins)}
          selected={hideDigitalTwins}
          size="small"
        >
          {hideDigitalTwins ? 'Show Digital Twins' : 'Hide Digital Twins'}
        </ToggleButton>
        <Typography gutterBottom variant="p" component="div" margin={2} marginBottom={0}>
          Sort by
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={currentType}
          exclusive
          onChange={handleChange}
          sx={{ padding: 2 }}
        >
          <ToggleButton value={'ALL'}>ALL</ToggleButton>
          <ToggleButton value={'SOLD'}>Sold</ToggleButton>
          <ToggleButton value={'RESOLD'}>Re-Sold</ToggleButton>
          <ToggleButton value={'SCANNED'}>Scanned</ToggleButton>
          <ToggleButton value={'INVALIDATED'}>Invalidated</ToggleButton>
          <ToggleButton value={'CHECKED IN'}>Checked In</ToggleButton>
        </ToggleButtonGroup>
        
        {filteredUsage.length > 0 ? (
          <Container maxWidth={false}>
            <Box>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Block Timestamp</TableCell>
                      <TableCell>Event Name</TableCell>
                      <TableCell>
                      Integrator</TableCell>
<TableCell>Price</TableCell>
<TableCell>GET Used</TableCell>
<TableCell>Activity Type</TableCell>
</TableRow>
</TableHead>
<TableBody>
{filteredUsage.slice(startIndex, endIndex).map((usage) => (
<ActivityDataLine
key={usage.nftId}
blockTimestamp={usage.blockTimestamp}
eventName={truncate(usage.event.name, 15)}
integrator={usage.event.integrator.name}
getUsed={usage.getUsed}
activityType={usage.type}
price={usage.price}
nftId={usage.nftId}
eventID={usage.event.id}
integratorID={usage.event.integrator.id}
/>
))}
</TableBody>
</Table>
</TableContainer>
<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
<Pagination count={pageCount} page={currentPage + 1} onChange={handlePageChange} />
</Box>
</Box>
</Container>
) : (
<NoTickets type={currentType} />
)}
</>
);
}

return (
<>
<Head>
<title>Recent Activity | GET Protocol Community</title>
</Head>
<DashboardLayout>{loading ? displayRecentActivity() : <LoadingSVG />}</DashboardLayout>
</>
);
};

export default RecentMints;