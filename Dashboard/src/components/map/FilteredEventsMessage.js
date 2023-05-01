import React from 'react';
import Link from 'next/link';

const FilteredEventsMessage = ({ count }) => {
  return (
    <>
      <p>
        <strong>INFO:</strong> This map displays all the events that have been created by the{' '}
        <Link href="/integrators">
          <a className="link">integrators</a>
        </Link>{' '}
        of{' '}
        <a href="https://www.get-protocol.io/" target="_blank" className="link">
          <strong><em>GET Protocol</em></strong>
        </a>.
      </p>
      <p>
        <strong>PLEASE NOTE:</strong> {count} events have been filtered from the events list as they have no geo data
        provided by the protocol integrator, and/or they were created by the &quot;Demo v1&quot; integrator. Learn more about{' '}
        <a href="https://www.get-protocol.io/" target="_blank" className="link">
          <strong><em>GET Protocol</em></strong>
        </a>.
      </p>
      <style jsx>{`
        .link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: bold;
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default FilteredEventsMessage;
