function getSimpleDate(date) {
  date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function isNowBetweenTimes(start, end) {
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  now = new Date().getTime();
  return start < now && end > now;
}

module.exports = { getSimpleDate, isNowBetweenTimes };
