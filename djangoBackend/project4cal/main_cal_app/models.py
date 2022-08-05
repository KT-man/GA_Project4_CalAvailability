import uuid
from django.db import models

# Create your models here.


class Users(models.Model):
    email = models.EmailField(max_length=254, primary_key=True)

    def __str__(self):
        return self.name


class Calendars(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.ForeignKey('Users', on_delete=models.DO_NOTHING, null=True)

    def __str__(self):
        return self.name


