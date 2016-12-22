/**
 * Parses a file and outputs each line. Taken from
 * http://stackoverflow.com/questions/14446447/javascript-read-local-text-file
 *
 *@param {File} file to be parsed
 */
function readTextFile(file) {
  var finalText;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4) {
      if(rawFile.status === 200 || rawFile.status === 0) {
        finalText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return finalText;
}

/**
 * Takes each line of a file and converts the output into a dictionary
 * (for two inputs)
 * 
 *@param {Text} the text resulting from readTextFile to dictionary
 */
function textToMap(text) {
  var map = {};
  var lines = text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var training = lines[i].split(', ');
    map[training[0]] = training[1];
  }
  return map;
}

/**
 * Takes each line of a file and converts the output into a dictionary
 * (for multiple inputs)
 * 
 *@param {Text} the text resulting from readTextFile to dictionary
 */
function textToMapMultiple(text) {
  var map = {};
  var lines = text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var training = lines[i].split(', ');
    map[training[0]] = [];
    // later make this more standardized
    map[training[0]].push(training[1]);
    map[training[0]].push(training[2]);
    map[training[0]].push(training[3]);
  }
  return map;
}

/**
 * Builds a dictionary of trainings by day
 */
function buildTrainingCalendar() {
  var cal = {};
  for (var i = 0; i < weekLimit; i++) {
    cal[i] = [];
  }
  return cal;
}

/**
 * Determine which week/day should be correct. Indexes at 0
 *
 *@param {Type} string for whether to calculate week or day
 *@param {Start} the start of the period
 *@param {eventTime} the time of the current event
 */
function determineDifference(type, start, eventTime) {
  var timeDiff = Math.abs(new Date(eventTime).getTime() - new Date(start).getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (type === 'week') {
    return Math.floor(diffDays / 7);
  } else {
    return diffDays-1;
  }
}

/**
 * Add a set number of days to another date and display nicely
 * Source: http://stackoverflow.com/questions/563406/add-days-to-javascript-date
 * Source: http://stackoverflow.com/questions/27869606/remove-time-from-gmt-time-format
 *
 *@param {Days} number of days to be added to the date
 */
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  var dateString = new Date(date).toUTCString();
  dateString = dateString.split(' ').slice(0, 4).join(' ');
  return dateString;
};

/**
 * Format the time in the way that looks nice
 *
 *@param {Training} What training to extract this time information from
 */
function formatTime(training) {
  var time = new Date(training.time);
  var hour = time.getHours() % 12;
  hour = hour ? hour : 12;
  var minute = time.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  var ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  return hour + ':' + minute + ' ' + ampm;
}

/**
 * Load checkboxes that users clicked on
 */
function checkCheckboxes() {
  for (var i = 0; i < 40; i++) {
    var mstone = 'mstone' + i.toString();
    if (localStorage.getItem(mstone)) {
      $('#' + mstone + ' input').prop('checked', true);
      $('#' + mstone).addClass('strikethrough');
    }
  }
}

/**
 * Changes the week to be displayed
 * 
 *@param {weekLimit} week check on how far or close the week can move
 *@param {weekIncrement} how much the week can increase or decrease
 *@param {dayIncrement} how much the day can increase or decrease
 */
function weekToggle(weekLimit, weekIncrement, dayIncrement) {
    if (currentWeek !== weekLimit) {
        $("." + currentWeek.toString()).hide();
        currentWeek += weekIncrement;
        currentDay += dayIncrement;
    }
    $("." + currentWeek.toString()).show();
    displaySchedule(currentWeek, currentDay);
}

/**
 * Changes the day to be displayed (increase or decrease)
 * 
 *@param {dayLimit} day check on how far or close the day can move
 *@param {dayIncrement} how much the day can increase or decrease
 */
function dayToggle(dayLimit, dayIncrement) {
    if (currentDay !== dayLimit) {
        currentDay += dayIncrement;
        $("." + currentWeek.toString()).hide();
        currentWeek = Math.floor(currentDay / 7);
    }
    $("." + currentWeek.toString()).show();
    displaySchedule(currentWeek, currentDay);
}

/**
 * Changes the day to be displayed (choose a specific day)
 * 
 *@param {day} what day should be changed
 */
function determineDay(day) {
    currentDay = day;
    $("." + currentWeek.toString()).hide();
    currentWeek = Math.floor(currentDay / 7);
    $("." + currentWeek.toString()).show();
    displaySchedule(currentWeek, currentDay);
}
