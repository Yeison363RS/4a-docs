from django.db import models

class Place(models.Model):
    id = models.AutoField(primary_key=True)
    namePlace = models.CharField('Name', max_length = 30)