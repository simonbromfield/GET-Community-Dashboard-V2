import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GetDataNavBar from './dashboard/getDataNavBar';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const customNavbarStyle = {
    backgroundColor: '#64B292',
    color: 'white',
  };

  return (
    <div style={customNavbarStyle}>
      <DashboardNavbarRoot
        style={customNavbarStyle}
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <GetDataNavBar />
        </Toolbar>
      </DashboardNavbarRoot>
    </div>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
