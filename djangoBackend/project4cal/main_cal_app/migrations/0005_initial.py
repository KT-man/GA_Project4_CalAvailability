# Generated by Django 4.1 on 2022-08-05 09:35

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('main_cal_app', '0004_delete_calendars_delete_users'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Calendars',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='main_cal_app.users')),
            ],
        ),
    ]