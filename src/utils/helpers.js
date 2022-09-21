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
