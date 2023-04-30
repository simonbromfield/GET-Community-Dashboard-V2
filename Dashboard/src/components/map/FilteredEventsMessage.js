import React from 'react';

const FilteredEventsMessage = ({ count }) => {
  return (
    <p>
      <strong>PLEASE NOTE:</strong> {count} events have been filtered from the events list as they have no geo data
      provided by the protocol integrator, and/or they were created by the &quot;Demo v1&quot; integrator.
    </p>
  );
};

export default FilteredEventsMessage;
