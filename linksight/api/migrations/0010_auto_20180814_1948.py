# Generated by Django 2.0.7 on 2018-08-14 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_dataset_is_internal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matchitem',
            name='matched',
            field=models.NullBooleanField(editable=False),
        ),
    ]
