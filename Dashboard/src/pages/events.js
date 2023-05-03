import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box } from '@mui/material';
import Head from 'next/head';
let W3CWebSocket = require('websocket').w3cwebsocket;
import SearchBar from '../components/eventPage/SearchBar';
import ControlsHeader from '../components/eventPage/ControlsHeader';
import EventList from '../components/eventPage/EventList';
import PaginationFooter from '../components/eventPage/PaginationFooter';

const EventsPage = () => {
  const [eventData, setEventData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false); // Add this line
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [filteredIntegrators, setFilteredIntegrators] = useState([1, 3]);

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

  const handleSort = (sortFunction) => {
    const sortedEvents = [...filteredEvents].sort(sortFunction);
    setFilteredEvents(sortedEvents);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(filteredEvents?.length / itemsPerPage);

  useEffect(() => {
    const client = new W3CWebSocket('wss://serene-reaches-92565.herokuapp.com/');
    client.onopen = () => {
      client.send(JSON.stringify({ action: 'requestAllEvents' }));
    };
    client.onmessage = (msg) => {
      let receivedMessage = JSON.parse(msg.data);
      if (receivedMessage.type === 'allEvents') {
        const initialEvents = receivedMessage.data.filter((event) => {
          return event.integrator.name !== 'GET Shared Partners v1' && event.integrator.name !== 'Demo v1';
        });
  
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
          <ControlsHeader onSort={handleSort} />
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
