import uuid
from django.utils.timezone import now
from django.db import models

# Create your models here.


class Users(models.Model):
    email = models.EmailField(max_length=254, primary_key=True, unique=True)

    def __str__(self):
        return self.email


class Calendars(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.ForeignKey('Users', on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return self.id


class Events(models.Model):
    duration = (
        ('0.5', '30 minutes'),
        ('1', '1 hour'),
        ('2', '2 hours'),
        ('4', '4 hours'),
        ('6', '6 hours'),
        ('12', '12hours'),
        ('24', '1 day'),
        ('48', '2 days'),
        ('72', '3 days'),
    )

    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name='event id')
    event_name = models.CharField(max_length=150, verbose_name='event name')
    event_date = models.DateField(verbose_name='event date', default=now())
    event_time = models.TimeField(verbose_name='event date', default=now())
    event_desc = models.TextField(verbose_name='event description')
    event_duration = models.CharField(verbose_name='event duration', max_length=100, choices=duration, default='1 hour')
    event_last_modified = models.DateTimeField(verbose_name='last modified', auto_now=True)

    def __str__(self):
        return self.event_id, self.event_name

