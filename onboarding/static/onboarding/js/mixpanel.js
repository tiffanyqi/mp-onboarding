// loading the mixpanel library
(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);

// mixpanel.init("fb040e46128c832e488ed81d7dc70497"); // dev
mixpanel.init("63f6ad94f9fe8a094bc37754053a6678"); // prod

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
