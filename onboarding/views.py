from onboarding.constants import TRAINING_VIEWS

from django.shortcuts import render

from .models import *


def index(request):
    return render(request, 'onboarding/index.html')


def intro(request):
    return render(request, 'onboarding/getting-started.html')


def trainings(request):
    context = {'training_views': TRAINING_VIEWS}
    return render(request, 'onboarding/trainings.html', context)


def reference(request):
    return render(request, 'onboarding/reference.html')


def team(request):
    return render(request, 'onboarding/team.html')
