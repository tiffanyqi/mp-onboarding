$(document).ready(function() {
  $('a').click(function(event) {
    if (!event.currentTarget.className) {
      mixpanel.track('External Link View', {
          'Page': document.referrer.split('/')[4],
          'Link': event.target.parentNode.innerText,
      });
    }
  });
});

/**
 * Increments a mixpanel super property
 *
 *@param {Property} the property to increment
 */
function incrementer(property) {
  value = mixpanel.get_property(property);
  update = {};
  if (value && typeof(value) == 'number') {
    update[property] = value +1;
  }
  else {
    update[property] = 1;
  }
  mixpanel.register(update);
}

/**
 * Create a Mixpanel profile
 *
 *@param {firstName} First name of user
 *@param {lastName} Last name of user
 *@param {Email} Email of user
 */
function createProfile(firstName, lastName, email) {
  mixpanel.alias(email);
  mixpanel.identify();
  // if email exists as a distinct_id, then set property
  mixpanel.people.set({
  '$first_name': firstName,
  '$last_name': lastName,
  '$name': firstName + ' ' + lastName,
  '$email': email
  });
  mixpanel.register({
    'Today': today,
    'Name': firstName + ' ' + lastName
  });
}

/**
 * Send a training event to Mixpanel
 *
 *@param {pageName} Name of the page it was from
 *@param {Event} Event the training came from
 */
function trackTraining(pageName, event) {
  mixpanel.track('Training View', {
    'Training': event.target.id.split('/')[4].slice(0, -5),
    'Page': pageName,
  });
}

/**
 * Send a completed milestone event to Mixpanel
 *
 *@param {Event} Event the milestone came from
 *@param {milestoneName} Number of the milestone
 */
function trackMilestone(event, milestoneName) {
  mixpanel.identify();
  mixpanel.track('Complete Milestone', {
    'Milestone': event.target.parentNode.innerText,
    'Number': milestoneName,
  });
  mixpanel.people.set({
    'Number of Milestones Completed': localStorage.length
  });
  mixpanel.register({
    'Number of Milestones Completed': localStorage.length
  });
}

/**
 * Send a button click event to Mixpanel
 *
 *@param {Event} Event the button came from
 *@param {currentDay} The day the button went to
 */
function trackButton(event, currentDay) {
  mixpanel.track('Traverse Time', {
    'Button': event.target.id,
    'Traversed Day': currentDay,
  });
}

/**
 * Send a page view event to Mixpanel
 *
 *@param {pageName} Name of the page it was from
 */
function trackPageView(pageName) {
  mixpanel.identify();
  mixpanel.track('Page View', {
    'Page': pageName,
  });
  if (pageName === 'Index') {
    mixpanel.people.increment('Number of Opens');
    // incrementer('Number of Page Views');
  }
}
