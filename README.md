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
- Comment out the prod Mixpanel key and use the dev one in mixpanel.js
- Get keys, and input into your ~/.bash_profile
- Go to your browser and type in localhost:8000
- Enjoy!

## Notes
- The content of this guide was taken completely from the Master Onboarding Guide. I've also added some of my own content, and am totally open to editing or updating the content of the various trainings. Feel free to make a PR!
- Questions or feedback? Contact Tiffany.


# Onboarding V2 TODOs:
## Features and major overhauls
- [ ] Connect Django Social Auth
- [ ] Create database (trainings and profile)
- [ ] Allow managers/mentors to see calendar and milestones of new support engineer
- [ ] Remove hacky JS (training loads, etc)

## Front-end
- [ ] Grab the link of the training
- [ ] Add favicon
- [ ] Get tips

## Mixpanel
- [ ] Register super and set people property for number of page views (incremental)
- [ ] Alias and identify properly


# Versions
## v1.0 - 02.16.2017
First version!
- Render the correct objective and milestone of current week
- Render calendar events
- Flip between different days and weeks of training
- Check milestones
- Connect event with corresponding training
- Add today's date
- Add team programmatically


# Onboarding V3
## Features
- [ ] Add notes to training docs
- [ ] Generalize trainings for all company
- [ ] Add history of Support

## Front-end
- [ ] Make everything look prettier
- [ ] Better content (milestones/objectives currently [here](https://docs.google.com/document/d/1LieLqdeWJGS1qPixCpKvHEIf53ND916PbkI_D3Itu8A/edit?ts=585c12a7))
- [ ] Use angular

## Back-end
- [ ] Cleaner code
- [ ] Optimize JS and cache loaded events
- [ ] Consolidate constants.py and trainings.csv
- [ ] Move client-side calendar to actually back-end (?)
- [ ] Programmatically find start-date (?)
- [ ] Establish security
