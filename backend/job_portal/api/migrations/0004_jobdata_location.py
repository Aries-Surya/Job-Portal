# Generated by Django 4.1.8 on 2023-05-08 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user_is_active_user_is_staff_user_is_superuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobdata',
            name='location',
            field=models.CharField(default='Not Provided', max_length=120),
        ),
    ]
