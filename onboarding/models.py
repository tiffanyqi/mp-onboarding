from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User)


class Calendar(models.Model):
    user = models.ForeignKey(User, related_name='calendar')


class Training(models.Model):
    name = models.CharField(max_length=250)
