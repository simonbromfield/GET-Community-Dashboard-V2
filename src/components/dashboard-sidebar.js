import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image'
import { NavItem } from './nav-item';

const items = [
  {
    href: '/',
    icon: (''),
    title: 'Dashboard'
  },
  {
    href: '/recent-activity',
    icon: (''),
    title: 'Recent Activity'
  },
  {
    href: '/events',
    icon: (''),
    title: 'Events'
  },
  {
    href: '/integrators',
    icon: (''),
    title: 'Integrators'
  },
  {
    href: '/charts',
    icon: (''),
    title: 'Charts'
  },
  {
    href: '/trades',
    icon: (''),
    title: 'Trades'
  },
  {
    href: '/top-ups',
    icon: (''),
    title: 'Top Ups'
  },
  {
    href: '/top-events',
    icon: (''),
    title: 'Top Events'
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
              <a>
              <Image
                  src="/static/images/logo.svg"
                  alt="Picture of the author"
                  width={300}
                  height={100}
                />
              </a>
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
            href="#"
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
