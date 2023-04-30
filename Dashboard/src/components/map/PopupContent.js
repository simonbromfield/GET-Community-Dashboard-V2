import React from 'react';

const PopupContent = ({ event }) => {
  return (
    <>
      <h3>{event.name}</h3>
      <p>Start Time: {new Date(event.startTime * 1000).toLocaleString()}</p>
      <p>End Time: {new Date(event.endTime * 1000).toLocaleString()}</p>
      <p>Integrator: {event.integrator.name}</p>
      <p>Sold Tickets: {event.soldCount}</p>
    </>
  );
};

export default PopupContent;
