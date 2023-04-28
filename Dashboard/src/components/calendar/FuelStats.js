import React from 'react';
import moment from 'moment';

const FuelStats = ({ events }) => {
  const calculateReservedFuel = (days) => {
    const cutoffDate = moment().subtract(days, 'days');

    const scaleFactor = BigInt(1e16);

    const sum = events
      .filter(event => moment.unix(event.startTime).isSameOrAfter(cutoffDate))
      .reduce((total, event) => total + BigInt(Math.round(parseFloat(event.reservedFuel) * 1e16)), BigInt(0));

    return Number(sum) / 1e16;
  };

  const formatFuel = (fuel) => fuel.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const reservedFuel7Days = formatFuel(calculateReservedFuel(7));
  const reservedFuel30Days = formatFuel(calculateReservedFuel(30));
  const reservedFuel365Days = formatFuel(calculateReservedFuel(365));

  const getDateRange = (days) => {
    const endDate = moment();
    const startDate = moment().subtract(days, 'days');
    return `(${startDate.format('MMM DD, YYYY')} - ${endDate.format('MMM DD, YYYY')})`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <h4>7 Days Reserved Fuel</h4>
        <p>{getDateRange(7)}</p>
        <p>{reservedFuel7Days} GET</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4>30 Days Reserved Fuel</h4>
        <p>{getDateRange(30)}</p>
        <p>{reservedFuel30Days} GET</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4>365 Days Reserved Fuel</h4>
        <p>{getDateRange(365)}</p>
        <p>{reservedFuel365Days} GET</p>
      </div>
    </div>
  );
};

export default FuelStats;
