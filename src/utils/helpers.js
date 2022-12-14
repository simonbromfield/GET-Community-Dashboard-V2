// turn timestamp into a date
export function dateR (timestamp) {
  const date = moment.unix(timestamp).format('MM/DD/YY | HH:mm')
  return date
}

// add commas in with the large numbers
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// make it into a 2 decimal place
export function twoDecRound (num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15))
  return Math.round(m) / 100 * Math.sign(num)
}

// truncate word length
export function truncate(str, n, useWordBoundary) {
  if (str.length <= n) { return str }
  const subString = str.substr(0, n - 1) // the original check
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(' '))
    : subString) + ' ...'
}

// add tickets sold prev to POLY
export function totalTicketSales(x) {
  let total = Number(Number(x) + 640630).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return total
}

// add events prev to POLY
export function totalEvents(x) {
  let total = Number(Number(x) + 4470).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return total
}

// format Fuel number
export function fuelFormat(x) {
  let total = `${Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} GET`
  return total
}

// turn protocolDay into a date string
export function protocolDayToDate(x) {
  const protocolStarted = new Date("June 22, 2021");
  var daySinceStart = (x - 18800) 
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  return addDays(protocolStarted, daySinceStart).toLocaleDateString('en-UK', { day: 'numeric', month:"short"})
}

// turn protocolDay into a date string full date
export function protocolDayToDateInFull(x) {
  const protocolStarted = new Date("June 22, 2021");
  var daySinceStart = (x - 18800) 
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  return addDays(protocolStarted, daySinceStart).toLocaleDateString('en-UK', { day: 'numeric', month:"short", year:"2-digit"})
}


