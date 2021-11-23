from django.db import models

class Tour(models.Model):
    id = models.AutoField(primary_key=True)
    guide = models.IntegerField('Guide')
    place = models.IntegerField('Place')
    title = models.CharField('Title', max_length = 100)
    costo = models.IntegerField('Costo',default=0)
    description = models.CharField('Description', max_length = 500)
    typeTour = models.CharField('TypeTour', max_length = 20,default="Regular")