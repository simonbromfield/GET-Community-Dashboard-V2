import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box, Button } from '@mui/material';
import Head from 'next/head';
let W3CWebSocket = require('websocket').w3cwebsocket;
import SearchBar from '../components/eventPage/SearchBar';
import EventList from '../components/eventPage/EventList';
import PaginationFooter from '../components/eventPage/PaginationFooter';
import moment from 'moment';

const EventsPage = () => {
  const [eventData, setEventData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false); // Add this line
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [filteredIntegrators, setFilteredIntegrators] = useState([1, 3]);

  const [sortType, setSortType] = useState('date'); // 'name' or 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const handleSearch = (query) => {
    setLoading(true);
    setIsSearching(true);

    if (eventData) {
      const filtered = eventData.filter((event) => {
        // Remove events with specific integrator names
        if (event.integrator.name === 'GET Shared Partners v1' || event.integrator.name === 'Demo v1') {
          return false;
        }

        // Filter events based on the search query
        if (query) {
          const eventNameMatch = event.name.toLowerCase().includes(query.toLowerCase());
          const integratorNameMatch = event.integrator.name.toLowerCase().includes(query.toLowerCase());
          return eventNameMatch || integratorNameMatch;
        }

        return true;
      });

      setFilteredEvents(filtered);
    }

    setLoading(false);
    setIsSearching(false);
  };

  const filterEvents = (events) => {
    return events.filter((event) => !filteredIntegrators.includes(event.integrator.id));
  };

  const handleSort = (type) => {
    setSortType(type);
    setSortOrder((prevOrder) => prevOrder === 'asc' ? 'desc' : 'asc');

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      let comparison = 0;

      switch(type) {
        case 'name':
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          comparison = nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
          break;
        case 'date':
        default:
          comparison = moment(a.StartTime).diff(moment(b.StartTime));
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredEvents(sortedEvents);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(filteredEvents?.length / itemsPerPage);

  useEffect(() => {
    const client = new W3CWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    client.onopen = () => {
      client.send(JSON.stringify({ action: 'requestAllEvents' }));
    };
    client.onmessage = (msg) => {
      let receivedMessage = JSON.parse(msg.data);
      if (receivedMessage.type === 'allEvents') {
        const initialEvents = receivedMessage.data.filter((event) => {
          return event.integrator.name !== 'GET Shared Partners v1' && event.integrator.name !== 'Demo v1';
        }).sort((a, b) => new Date(a.BlockTimestamp) - new Date(b.BlockTimestamp)); // sort by BlockTimestamp initially

        setEventData(receivedMessage.data);
        setFilteredEvents(initialEvents);
        setLoading(false);
      }
    };
    client.onerror = function () {
      console.log('Connection Error');
    };
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          padding: 3
        }}
      >
        <div>
          <SearchBar onSearch={handleSearch} />
          <Button onClick={() => handleSort('name')}>Sort by name</Button>
          <EventList
            events={filteredEvents.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            loading={loading}
            isSearching={isSearching}
          />
          <PaginationFooter
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Box>
    </>
  );
};

EventsPage.getLayout = (page) => (
  <>
    <Head>
      <title>Events | GET Protocol Community</title>
    </Head>
    <DashboardLayout>{page}</DashboardLayout>
  </>
);

export default EventsPage;
