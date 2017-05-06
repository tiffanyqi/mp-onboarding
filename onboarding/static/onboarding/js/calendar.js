// setup
var CLIENT_ID = '826991837183-hct4av8fkatbc8v1dvfpneq0ej3d9qj7.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly", "https://www.googleapis.com/auth/plus.login", "https://www.googleapis.com/auth/plus.profile.emails.read"];
var trainings = textToMap(readTextFile('/static/onboarding/csv/training.csv'));
// various dates
var now = new Date(); // today's date
var start; // start date
var currentDay; // number of current day relative to start
var currentWeek; // number of current week relative to start
var today; // number of today relative to start
var todayDate; // the date of calendar rendering
var weekLimit = 49;
var calendar = buildTrainingCalendar();

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authorizeDiv) {
    if (authResult && !authResult.error) {
      authorizeDiv.style.display = 'none';
      loadCalendarApi();
      loadProfileApi();
    } else {
      authorizeDiv.style.display = 'inline';
    }
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  var cal = document.getElementById('calendar');
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
  cal.style.display = 'inline';
}

/**
 * Load Google Plus client library. Retrieve user information
 * once client library is loaded.
 */
function loadProfileApi() {
  gapi.client.load('plus','v1', getUser);
}

/**
 * Retrieves user's information and signs them in
 */
function getUser() {
  var request = gapi.client.plus.people.get({
    'userId': 'me'
  });
  request.execute(function(resp) {
    var firstName = resp.name.givenName;
    var lastName = resp.name.familyName;
    var email = resp.emails[0].value;
    if (!localStorage.getItem('firstName')) {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('email', email);
      $('#self').append(', ' + firstName);
      createProfile(firstName, lastName, email, new Date(start));
    }
  });
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date(2013)).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 1000,
    'orderBy': 'startTime'
  });
  request.execute(function(resp) {
    var events = resp.items;
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        for (var training in trainings) {
          if (event.summary && event.summary.toLowerCase().includes(training.toLowerCase())) {
            generateCalendar(event, training);
          }
        }
      }
    }
    currentWeek = determineDifference('week', start, now);
    currentDay = determineDifference('day', start, now);
    actualDay = determineDifference('day', start, currentDay);
    today = currentDay;
    displaySchedule(currentWeek, currentDay);
    registerDates(currentWeek, today, new Date(start));
  });
}

/**
 * Generate the dictionary of days of training to trainings of that day
 *
 *@param {Event} The event to include
 *@param {Training} The training corresponding to that training
 */
function generateCalendar(event, training) {
  var when = event.start.dateTime ? event.start.dateTime : event.start.date;
  var dayToAdd = 0;
  if (!start) {
    start = new Date(when).setHours(0,0,0,0);
  } else {
    dayToAdd = determineDifference('day', start, when);
  }
  var dayOfWeek = new Date(when).getDay();
  if (dayToAdd < weekLimit) {
    calendar[dayToAdd].push({
      "title": event.summary,
      "time": when,
      "link": trainings[training],
      "location": event.location
    });
  }
}

/**
 * Display a different schedule depending on what day or week the user wants to be on
 *
 *@param {Week} What week to display
 *@param {Day} What day to display
 */
function displaySchedule(week, day) {
  var dateForDisplay = 'Week ' + (week + 1).toString() + ', Day ' + (day + 1).toString();
  $('#date').text(dateForDisplay);
  todayDate = new Date(start).addDays(day);
  $('#todayDate').text(todayDate);
  if (calendar && day < weekLimit) {
    $('#schedule').empty().append(generateSchedule(calendar, day));
    $("." + week.toString()).show();
    checkCheckboxes();
  }
  console.log(start);
}

/**
 * Generates the table based on the current day
 *
 *@param {Calendar} The dictionary of trainings
 *@param {Day} The current day of trainings to display
 */
function generateSchedule(calendar, day) {
  var schedule = '';
  if (calendar[day].length !== 0) {
    schedule = '<tr><th>Time</th><th>Training</th><th>Location</th></tr>';
    for (var i = 0; i < calendar[day].length; i++) {
      var training = calendar[day][i];
      var trainingTime = formatTime(training);
      var location = training.location ? training.location.split('(')[0] : 'No Location' ;
      schedule += '<tr><td>' + trainingTime + '</td><td><a class="training-link" id="/static/onboarding/' + training.link + '">' + training.title + '</a></td><td>'+ location + '</td></tr>';
    }
  } else {
    schedule += '<div id="msg">You have no trainings today :)</div>';
  }
  return schedule;
}
