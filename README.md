Onboarding @ Mixpanel Support
=============================

# About
The purpose of this project is to improve the organization of the Support Onboarding Process.

# Running this project
## Requirements
- [Django 1.10.3](https://docs.djangoproject.com/en/1.10/intro/install/)
- [Virtualenv 15.1.0](https://virtualenv.pypa.io/en/stable/userguide/#usage)

## Development Instructions
- Install Django, which is the framework we use to run this project.
- Install Virtualenv, which provides us a virtual environment in which provides Django space to run
- Run your env in accordance with the virtualenv instructions, then return to the main repository.
- Run `python manage.py migrate`
- Change 'PRODUCTION' to False in settings.py
- Comment out the prod Mixpanel key and use the dev one in mixpanel.js
- Get keys
- Go to your browser and type in localhost:8000
- Enjoy!

## Notes
- The content of this guide was taken completely from the Master Onboarding Guide. I've also added some of my own content, and am totally open to editing or updating the content of the various trainings. Feel free to make a PR!
- Questions? Contact Tiffany.

# Onboarding V1
## Features
- [x] Render the correct objective and milestone of current week
- [x] Render calendar events
- [x] Flip between different days and weeks of training
- [x] Check milestones
- [x] Connect event with corresponding training
- [x] Add today's date
- [x] Add team programmatically

## Front-end
- [x] Copy over content, populate reference and getting started
- [x] Make everything look pretty
- [x] Make a footer
- [x] Add final milestones for folks after 4 weeks

## "Back-end"
- [x] Establish a count for the current week
- [x] Integrate with GCalendar API
- [x] Integrate with Google Plus API
- [x] Figure out how static files can extend to template
- [x] Better way to search for trainings
- [x] Figure out why not all the trainings are coming in
- [x] Show static files
- [x] Get it live
- [x] Connect to Google in production
- [ ] Establish security

## Mixpanel
- [x] Add track call for when user clicks on button or views a page
- [x] Add track call for when user opens a training or clicks on an external link
- [x] Add track call for when user completes a milestone
- [x] Set super property for today
- [x] Register super and set people property for total milestones completed (incremental)
- [ ] Register super and set people property for number of page views (incremental)
- [ ] Alias and identify properly
- [x] Create people profile

# Onboarding V2:
## Front-end
- [ ] Make everything look prettier
- [ ] Better content
- [ ] Use angular
- [ ] Convert popups to true links?
- [ ] Get tips

## Features
- [ ] Sign up flow
- [ ] Add notes to training docs
- [ ] Generalize trainings for all company
- [ ] Add history of Support

## Back-end
- [ ] Cleaner code
- [ ] Optimize JS and cache loaded events
- [ ] Consolidate constants.py and trainings.csv
- [ ] Move client-side calendar to actually back-end
- [ ] Programmatically find start-date
