import { Container } from '@mui/material'

import { DashboardLayout } from '../components/dashboard-layout';

const Charts = () => (
  <>
    <Container>
      <h2>Charts</h2>
  </Container>
  </>
);

Charts.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Charts
