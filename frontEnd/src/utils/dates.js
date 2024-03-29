export function addOneYear(date) {
  date.setFullYear(date.getFullYear() + 1);
  return date;
}

export function addHours(date, hours) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);

  return date;
}

export function isStartDateBeforeEndDate(start, end) {
  let date1 = new Date(start).getTime();
  let date2 = new Date(end).getTime();
  return date1 < date2;
}
export function isNowBetweenTimes(start, end, now) {
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  now = new Date().getTime();
  return start < now && end > now;
}

export function getSimpleDate(date) {
  date = new Date(date);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
export function getSimpleTime(time) {
  time = new Date(time);
  const hour = time.getHours();
  const minute = time.getMinutes() + 1;
  return `${hour}:${minute}`;
}
export function convertToMuiDateFormat(date) {
  date = new Date(date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed, so add 1
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function convertToMuiTimeFormat(date) {
  date = new Date(date);
  const time =
    date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes + ":00";
  return time;
}

export function getDateAndTimesFromMUI(
  dateValue,
  startTimeValue,
  endTimeValue
) {
  let date = new Date(dateValue["$d"]);

  let dateSetter = new Date(date);
  let startTimeMs = dateSetter.setHours(
    startTimeValue["$H"],
    startTimeValue["$m"],
    0
  );
  let endTimeMs = dateSetter.setHours(
    endTimeValue["$H"],
    endTimeValue["$m"],
    0
  );

  let startTime = new Date(startTimeMs);
  let endTime = new Date(endTimeMs);

  return { date, startTime, endTime };
}
export const simpleDateToDate = function (date) {
  const dateArray = date.split("/");
  const day = dateArray[0];
  const month = dateArray[1];
  const year = dateArray[2];

  return new Date(year, month - 1, day);
};

export function getWeekDay(date, type) {
  return new Date(date).toLocaleString("default", { weekday: type });
}

export function addMonthsToDate(date, months) {
  const originalMonth = date.getMonth();
  const originalYear = date.getFullYear();

  const newMonth = (originalMonth + months) % 12;
  const yearOffset = Math.floor((originalMonth + months) / 12);
  const newYear = originalYear + yearOffset;

  const newDate = new Date(
    newYear,
    newMonth,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );

  return newDate;
}
