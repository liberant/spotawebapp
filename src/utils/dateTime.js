export function getDayMonthYear(value) {
  value = String(value);
  var error = false;
  var splitChar = '.';
  if (value.includes('.')) {
    splitChar = '.';
  } else if (value.includes(',')) {
    splitChar = ',';
  } else if (value.includes('-')) {
    splitChar = '-';
  } else {
    error = true;
  }

  var parts = value.split(splitChar);

  var day = parts[0] ? parts[0] : undefined;
  var month = parts[1] ? parts[1] : undefined;
  var year = parts[2] ? parts[2] : undefined;

  // check for errors
  error = parts.length > 3 ? true : error;
  error = day && month ? error : true;

  return {
    day: day,
    month: month,
    year: year,
    error: error
  };
}

export function formatDateToObject(value, formatOptions) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'de-DE';

  var currDay = new Date().toLocaleString(locale, formatOptions).split('.')[0];
  var currMonth = parseInt(new Date().getMonth(), 10) + 1;
  var currYear = parseInt(new Date().getFullYear(), 10);

  var _getDayMonthYear = getDayMonthYear(value),
      day = _getDayMonthYear.day,
      month = _getDayMonthYear.month,
      year = _getDayMonthYear.year,
      error = _getDayMonthYear.error;

  if (value === undefined) {
    return undefined;
  }

  if (!year) {
    year = currYear;

    if (month < currMonth && month > 9) {
      year = currYear + 1;
    } else if (month === currMonth && day < currDay) {
      year = currYear + 1;
    }
  } else {
    var intYear = parseInt(year, 10);

    if (intYear === 0) {
      year = '2000';
    } else if (intYear < 100 && intYear >= 10) {
      year = '20' + year;
    } else if (intYear < 10 && intYear >= 0) {
      year = '200' + year;
    } else if (intYear >= 10000 || intYear < 2000) {
      error = true;
    }
  }

  if (error) {
    return undefined;
  }

  var tempDate = new Date(month + '.' + day + '.' + year);
  if (tempDate.toString() !== 'Invalid Date') {
    return tempDate;
  } else {
    return undefined;
  }
}

export function formatDateToString(value, formatOptions) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'de-DE';

  var dateString = formatDateToObject(value, formatOptions);

  if (dateString === undefined) {
    return '';
  } else {
    return dateString.toLocaleString(locale, formatOptions);
  }
}

export function formatTimeToObject(value) {
  if (value === undefined) {
    return undefined;
  }

  var splitChar = '';
  if (value.includes('.')) {
    splitChar = '.';
  } else if (value.includes(',')) {
    splitChar = ',';
  } else if (value.includes('-')) {
    splitChar = '-';
  } else if (value.includes(':')) {
    splitChar = ':';
  }

  var parts = value.split(splitChar);
  var hours = void 0;
  var minutes = void 0;

  if (parts.length > 2 && splitChar !== '') {
    return undefined;
  }

  if (splitChar !== '') {
    hours = parts[0] ? parts[0] : undefined;
    minutes = parts[1] ? parts[1] : '00';
  } else if (value.length === 2) {
    hours = value.substring(0, 2);
    minutes = '00';
  } else if (value.length === 3) {
    hours = value.substring(0, 1);
    minutes = value.substring(1, 3);
  } else if (value.length === 4) {
    hours = value.substring(0, 2);
    minutes = value.substring(2, 4);
  }

  var tempTime = new Date('01.01.2000 ' + hours + ':' + minutes);

  if (tempTime.toString() !== 'Invalid Date') {
    return tempTime;
  } else {
    return undefined;
  }
}

export function formatTimeToString(value, formatOptions) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'de-DE';

  var timeObject = formatTimeToObject(value, formatOptions);
  if (timeObject === undefined) {
    return '';
  } else {
    return timeObject.toLocaleString(locale, formatOptions);
  }
}