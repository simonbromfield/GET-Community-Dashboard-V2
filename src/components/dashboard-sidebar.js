import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image'
import { NavItem } from './nav-item';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PublishIcon from '@mui/icons-material/Publish';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PeopleIcon from '@mui/icons-material/People';
import TwitterIcon from '@mui/icons-material/Twitter';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { TwitterFollowButton } from 'react-twitter-embed';

const items = [
  {
    href: '/',
    icon: (<DashboardIcon />),
    title: 'Dashboard',
    target: ''
  },
  {
    href: '/recent-activity',
    icon: (<ConfirmationNumberIcon />),
    title: 'Recent Activity',
    target: ''
  },
  {
    href: '/events',
    icon: (<EventIcon />),
    title: 'Events',
    target: ''
  },
  {
    href: '/integrators',
    icon: (<IntegrationInstructionsIcon />),
    title: 'Integrators',
    target: ''
  },
  {
    href: '/charts',
    icon: (<SsidChartIcon />),
    title: 'Charts',
    target: ''
  },
  {
    href: '/trades',
    icon: (<SyncAltIcon />),
    title: 'DEX Trades',
    target: ''
  },
  {
    href: '/top-ups',
    icon: (<PublishIcon />),
    title: 'Top Ups',
    target: ''
  },
  {
    href: '/leaderboards',
    icon: (<LeaderboardIcon />),
    title: 'Leaderboards',
    target: ''
  },
  {
    href: '/bot',
    icon: (<TwitterIcon />),
    title: 'Twitter Bot',
    target: ''
  },
  {
    href: 'https://www.get-community.com/',
    icon: (<PeopleIcon />),
    title: 'Community Homepage',
    target: '_blank'
  },
  {
    href: 'https://sleepy-shore-42215.herokuapp.com/',
    icon: (<BackupTableIcon />),
    title: 'Archived Dashboad V1 ',
    target: '_blank'
  }
];

const customSiderbarStyle = {
  backgroundColor: '#170742',
  borderRight: 'solid 5px #64B292'
};

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <div style={customSiderbarStyle}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <Image
                  src="/static/images/logo.svg"
                  alt="Picture of the author"
                  width={300}
                  height={100}
                />
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
    
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              target={item.target}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Join our community
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            contribute | learn | get involved
          </Typography>
          <NextLink
            href="https://discord.gg/get-protocol-889431643494944768"
            target="_blank"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              JOIN US ON DISCORD
            </Button>
          </NextLink>
        </Box>
        <TwitterFollowButton
          screenName={'GET_comm_dash'}
        />
      </Box>
    </div>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
